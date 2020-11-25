const tokens = require('../utils/tokens')

const authenticate = (request, response, next) => {
    const header = request.headers['authorization']
    const token = header && header.split(' ')[1]

    if (token == null) {
        return response.sendStatus(401)
    }

    tokens.verify(token, (error, user) => {
        if (error) {
            return response.sendStatus(403)
        }
        request.user = user
        next()
    })
}

module.exports = authenticate
