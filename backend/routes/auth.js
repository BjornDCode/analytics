const express = require('express')

const tokens = require('../utils/tokens')
const database = require('../utils/database')
const encryption = require('../utils/encryption')
const mail = require('../utils/mail')

const router = express.Router()

router.post('/login', async (request, response) => {
    const email = request.body.email || ''
    const password = request.body.password || ''

    const record = await database.getUserByEmail(email)

    if (!record) {
        return response.status(401).send({ message: 'Could not authenticate' })
    }

    const matches = await encryption.matches(password, record.password)

    if (!matches) {
        return response.status(401).send({ message: 'Could not authenticate' })
    }

    const user = { name: record.username }
    const accessToken = tokens.generateAccessToken(user)
    const refreshToken = tokens.generateRefreshToken(user)

    await database.storeRefreshToken(refreshToken, record.id)

    return response.json({
        accessToken: accessToken,
        refreshToken: refreshToken,
    })
})

router.post('/register', async (request, response) => {
    const username = request.body.username || ''
    const email = request.body.email || ''
    const password = request.body.password || ''
    const password_confirmation = request.body.password_confirmation || ''

    const existingRecord = await database.getUserByEmail(email)

    if (existingRecord) {
        return response.status(401).send({ message: 'User already exists' })
    }

    if (password !== password_confirmation) {
        return response.status(401).send({ message: 'Passwords must match' })
    }

    database.storeUser(username, email, await encryption.hash(password))
    mail.send(
        email,
        'Please confirm your email',
        `You've signed up for the KEA auth app. Please confirm your email to continue by clicking the link below. <a href="http://localhost:8080/confirm-email/${encryption.toBase64(
            email
        )}">Confirm email</a>`
    )

    return response.send({
        message: 'User created',
    })
})

router.get('/confirm-email/:hash', async (request, response) => {
    const hash = request.params.hash || ''
    const email = encryption.fromBase64(hash)

    const record = await database.getUserByEmail(email)
    database.updateUser(record.id, ['email_confirmed'], [1])

    return response.send('Confirmed')
})

module.exports = router
