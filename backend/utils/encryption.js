const bcrypt = require('bcrypt')

const hash = async password => {
    return await bcrypt.hash(password, 10)
}

const matches = async (input, hash) => {
    return await bcrypt.compare(input, hash)
}

module.exports = {
    hash,
    matches,
}
