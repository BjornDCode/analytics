const tokens = require('../utils/tokens')

const authenticate = (socket, next) => {
    if (!socket.handshake.query && socket.handshake.query.token) {
        new Error('Authentication Error')
    }
    const token = socket.handshake.query.token

    tokens.verify(token, (error, user) => {
        if (error) {
            return Error(error)
        }

        next()
    })
}

module.exports = authenticate
