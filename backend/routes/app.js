const express = require('express')
const authenticate = require('../middleware/authenticate')
const database = require('../utils/database')
const io = require('./socket')

const router = express.Router()

const errorResponse = (response, status = 404, message = '') =>
    response.status(status).send({ message })

router.get('/projects', authenticate, async (request, response) => {
    return response.json({
        projects: await database.getProjectsByUserId(request.user.id),
    })
})

router.post('/projects', authenticate, async (request, response) => {
    const name = request.body.name || ''

    if (!name) {
        return errorResponse(response, 422, 'Name is required')
    }

    const record = await database.storeProject(name, request.user.id)

    return response.json({
        project: record,
    })
})

router.put('/projects/:id', authenticate, async (request, response) => {
    const id = request.params.id || ''

    const record = await database.getProjectByIdAndUserId(id, request.user.id)

    if (!record) {
        return errorResponse(response, 404, 'Project not found')
    }

    const name = request.body.name || ''

    if (!name) {
        return errorResponse(response, 422, 'Name is required')
    }

    const updatedRecord = await database.updateProject(id, name)

    return response.json({
        project: updatedRecord,
    })
})

router.delete('/projects/:id', authenticate, async (request, response) => {
    const id = request.params.id || ''

    const record = await database.getProjectByIdAndUserId(id, request.user.id)

    if (!record) {
        return errorResponse(response, 404, 'Project not found')
    }

    await database.deleteProject(id)

    return response.json({})
})

router.get('/event-types', authenticate, async (request, response) => {
    const projects = await database.getProjectsByUserId(request.user.id)
    const ids = [...projects].map(project => project.id)

    const eventTypes = await database.getEventsByProjectIds(ids)

    return response.json({
        eventTypes: eventTypes,
    })
})

router.post('/event-types', authenticate, async (request, response) => {
    const name = request.body.name || ''
    const identifier = request.body.identifier || ''
    const project_id = request.body.project_id || ''

    if (!name) {
        return errorResponse(response, 422, 'Name is required')
    }

    if (!identifier) {
        return errorResponse(response, 422, 'Identifier is required')
    }

    if (!project_id) {
        return errorResponse(response, 422, 'Project is required')
    }

    const project = await database.getProjectByIdAndUserId(
        project_id,
        request.user.id
    )

    if (!project) {
        return errorResponse(response, 404, 'Project not found')
    }

    const existingRecord = await database.getEventTypeByIdentifierAndProject(
        identifier,
        project_id
    )

    if (existingRecord) {
        return errorResponse(
            response,
            422,
            'The identifier must be unique for a project'
        )
    }

    const record = await database.storeEventType(name, identifier, project_id)

    return response.json({
        eventType: record,
    })
})

router.delete('/event-types/:id', authenticate, async (request, response) => {
    const id = request.params.id || ''

    const record = await database.getEventTypeById(id, request.user.id)

    if (!record) {
        return errorResponse(response, 404, 'Event type not found')
    }

    const project = await database.getProjectByIdAndUserId(
        record.project_id,
        request.user.id
    )

    if (!project) {
        return errorResponse(response, 404, 'Event type not found')
    }

    await database.deleteEventType(id)

    return response.json({})
})

router.get('/track', async (request, response) => {
    const {
        project: project_id,
        event: identifier,
        trackee,
        value,
        referrer,
        country,
        browser,
        device,
        os,
    } = request.query

    // Check that all parameters (except for value) are included in the request
    if (
        [
            project_id,
            identifier,
            trackee,
            referrer,
            country,
            browser,
            device,
            os,
        ].some(value => !value)
    ) {
        return response.send('Discarded')
    }

    const project = await database.getProjectById(project_id)

    if (!project) {
        return response.send('Discarded')
    }

    const eventType = await database.getEventTypeByIdentifierAndProject(
        identifier,
        project_id
    )

    if (!eventType) {
        return response.send('Discarded')
    }

    await database.storeEvent(
        eventType.id,
        trackee,
        value,
        referrer,
        country,
        browser,
        device,
        os
    )
    const connections =
        (await database.getConnectionsByProjectId(project_id)) || []
    connections.forEach(connection => {
        io.to(connection.socket_id).emit('update')
    })

    return response.send('Tracked')
})

module.exports = router
