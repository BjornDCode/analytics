const express = require('express')
const authenticate = require('../middleware/authenticate')
const database = require('../utils/database')

const router = express.Router()

router.get('/projects', authenticate, async (request, response) => {
    return response.json({
        projects: await database.getProjectsByUserId(request.user.id),
    })
})

router.post('/projects', authenticate, async (request, response) => {
    const name = request.body.name || ''

    if (!name) {
        return response.status(422).send({ message: 'Name is required' })
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
        return response.status(404).send({ message: 'Project not found' })
    }

    const name = request.body.name || ''

    if (!name) {
        return response.status(422).send({ message: 'Name is required' })
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
        return response.status(404).send({ message: 'Project not found' })
    }

    await database.deleteProject(id)

    return response.json({})
})

module.exports = router
