const bcrypt = require('bcrypt')

const hash = async password => {
    return await bcrypt.hash(password, 10)
}

const matches = async (input, hash) => {
    return await bcrypt.compare(input, hash)
}

const toBase64 = string => {
    return Buffer.from(string, 'utf8').toString('base64')
}

const fromBase64 = string => {
    return Buffer.from(string, 'base64').toString('utf8')
}

module.exports = {
    hash,
    matches,
    toBase64,
    fromBase64,
}
