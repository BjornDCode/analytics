const express = require('express')
const authenticate = require('../middleware/authenticate')
const database = require('../utils/database')

const router = express.Router()

router.get('/posts', authenticate, async (request, response) => {
    return response.json({
        data: await database.getPostsByUserId(request.user.id),
    })
})

module.exports = router
