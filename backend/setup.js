require('dotenv').config()

const setupDatabase = require('./utils/database').setup

setupDatabase()
