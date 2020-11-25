const express = require('express')

const tokens = require('../utils/tokens')
const database = require('../utils/database')
const encryption = require('../utils/encryption')

const router = express.Router()

router.post('/login', async (request, response) => {
    const username = request.body.username || ''
    const password = request.body.password || ''
    const user = { name: username }

    const record = await database.getUserByUsername(username)

    if (!record) {
        return response.status(401).send({ message: 'Could not authenticate' })
    }

    const matches = await encryption.matches(password, record.password)

    if (!matches) {
        return response.status(401).send({ message: 'Could not authenticate' })
    }

    const accessToken = tokens.generateAccessToken(user)
    const refreshToken = tokens.generateRefreshToken(user)

    await database.storeRefreshToken(refreshToken, record.id)

    return response.json({
        accessToken: accessToken,
        refreshToken: refreshToken,
    })
})

module.exports = router
