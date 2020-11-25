const mysql = require('promise-mysql')
const SqlString = require('sqlstring')

const getConnection = async () => {
    return await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        insecureAuth: true,
    })
}

const setup = async () => {
    const db = await getConnection()

    const usersTable = `
        CREATE TABLE users(
            id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            email_confirmed BOOLEAN DEFAULT 0,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
        );

    `

    const refreshTokensTable = `
        CREATE TABLE refresh_tokens(
            id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
            token VARCHAR(255) NOT NULL,
            user_id BIGINT(20) UNSIGNED NOT NULL
        );
    `

    const postsTable = `
        CREATE TABLE posts(
            id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            user_id BIGINT(20) UNSIGNED NOT NULL
        );   
    `

    await db.query(usersTable)
    await db.query(refreshTokensTable)
    await db.query(postsTable)

    await db.end()
}

const getUserByEmail = async email => {
    const db = await getConnection()
    const results = await db.query(
        SqlString.format('SELECT * FROM users WHERE email = ? LIMIT 1', [email])
    )
    await db.end()
    return results[0]
}

const storeUser = async (name, email, password) => {
    const db = await getConnection()
    await db.query(
        SqlString.format(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, password]
        )
    )

    await db.end()

    return await getUserByEmail(email)
}

const updateUser = async (id, fields, values) => {
    const db = await getConnection()
    const results = await db.query(
        SqlString.format(
            `
            UPDATE users 
            SET ${fields.map(field => field + ' = ?').join(',')}
            WHERE id = ?;
            `,
            [...values, id]
        )
    )
    await db.end()
}

const storeRefreshToken = async (token, id) => {
    const db = await getConnection()
    const results = await db.query(
        SqlString.format(
            'INSERT INTO refresh_tokens (token, user_id) VALUES (?, ?)',
            [token, id]
        )
    )
    await db.end()
}

const deleteRefreshToken = async id => {
    const db = await getConnection()
    const results = await db.query(
        SqlString.format('DELETE FROM refresh_tokens WHERE user_id = ?', [id])
    )
    await db.end()
}

const getPostsByUserId = async id => {
    const db = await getConnection()
    const results = await db.query(
        SqlString.format('SELECT * FROM posts WHERE id = ?', [id])
    )
    await db.end()

    return results
}

const storePost = async (title, id) => {
    const db = await getConnection()
    const results = await db.query(
        SqlString.format('INSERT INTO posts (title, user_id) VALUES (?, ?)', [
            title,
            id,
        ])
    )
    await db.end()
}

module.exports = {
    setup,
    getUserByEmail,
    storeUser,
    updateUser,
    storeRefreshToken,
    deleteRefreshToken,
    getPostsByUserId,
    storePost,
}
