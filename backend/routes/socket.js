const server = require('../app').server
const io = require('socket.io')(server)
const authenticate = require('../middleware/authenticateSocket')
const getProjectData = require('../utils/data').project
const database = require('../utils/database')

io.use(authenticate)

io.on('connection', socket => {
    socket.on('project', async ({ id }) => {
        if (!id) {
            return
        }

        await database.storeConnection(socket.id, id)

        // Since the data is private it should only be returned to this socket instance
        socket.emit('data', await getProjectData(id))
    })

    socket.on('disconnect', async () => {
        await database.deleteConnection(socket.id)
    })
})

module.exports = io
