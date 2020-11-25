const mysql = require('mysql')

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    insecureAuth: true,
})

const setup = () => {
    const script = `
        CREATE TABLE users(
            id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
        );
    `

    query(script)
}

const query = query => {
    connection.connect()

    connection.query(query, (error, results, fields) => {
        console.error('error', error)
        console.log('results', results)
        console.log('fields', fields)
        if (error) {
            throw error
        }
    })

    connection.end()
}

module.exports = {
    setup,
    query,
}
