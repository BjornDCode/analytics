const jwt = require('jsonwebtoken')

const generateAccessToken = user => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1000s',
    })
}

const generateRefreshToken = user => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
}

const verify = (token, callback = () => {}) => {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        callback(error, user)
    })
}

const verifyRefresh = (token, callback = () => {}) => {
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
        callback(error, user)
    })
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verify,
    verifyRefresh,
}
