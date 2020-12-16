require('dotenv').config()

const express = require('express')
const cors = require('cors')
const rateLimiter = require('express-rate-limit')

const authRoutes = require('./routes/auth.js')
const appRoutes = require('./routes/app.js')

const app = express()

app.use(express.json())
app.use(cors())

app.use(
    rateLimiter({
        // windowMs: 10 * 60 * 1000, // 10 minutes
        windowMs: 60 * 1000, // 1 minutes
        max: 1000,
    })
)

app.use(authRoutes)
app.use(appRoutes)

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log('Listening on port', port)
})
