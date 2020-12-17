const server = require('../app').server
const io = require('socket.io')(server)

io.on('connection', socket => {
    socket.on('project', ({ id }) => {
        if (!id) {
            return
        }

        // Since the data is private it should only be returned to this socket instance
        socket.emit('data', { test: 'test' })
    })

    socket.on('disconnect', () => {
        console.log('disconnected')
    })
})
