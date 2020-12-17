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

    const disableForeignKeys = `SET foreign_key_checks = 0;`
    const cleanup = `
       DROP TABLE IF EXISTS users, refresh_tokens, projects, event_types, events; 
    `
    const enableForeignKeys = `SET foreign_key_checks = 1;`

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
            user_id BIGINT(20) UNSIGNED NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );
    `

    const projectsTable = `
        CREATE TABLE projects(
            id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            user_id BIGINT(20) UNSIGNED NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );   
    `

    const eventTypesTable = `
        CREATE TABLE event_types(
            id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            identifier VARCHAR(255) NOT NULL,
            project_id BIGINT(20) UNSIGNED NOT NULL,
            FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
        );   
    `

    const eventsTable = `
        CREATE TABLE events(
            id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
            trackee VARCHAR(255) NOT NULL,
            value VARCHAR(255),
            referrer VARCHAR(255) NOT NULL,
            country VARCHAR(255) NOT NULL,
            browser VARCHAR(255) NOT NULL,
            os VARCHAR(255) NOT NULL,
            device VARCHAR(255) NOT NULL,
            event_type_id BIGINT(20) UNSIGNED NOT NULL,
            FOREIGN KEY (event_type_id) REFERENCES event_types(id) ON DELETE CASCADE
        );   
    `

    await db.query(disableForeignKeys)
    await db.query(cleanup)
    await db.query(enableForeignKeys)
    await db.query(usersTable)
    await db.query(refreshTokensTable)
    await db.query(projectsTable)
    await db.query(eventTypesTable)
    await db.query(eventsTable)

    // Generate dummy data
    await storeUser(
        'test',
        'a@a.com',
        '$2b$10$8GjTsvxkHy1EbBOfEsHYpOl/31LPcjXrJhNKYewcSo/Q5SDuKw60m'
    )

    await storeProject('test.app', 1)
    await storeProject('random.dev', 1)
    await storeProject('cool.io', 1)

    await storeEventType('Page view', 'PAGE_VIEW', 1)
    await storeEventType('Page view', 'PAGE_VIEW', 2)
    await storeEventType('Page view', 'PAGE_VIEW', 3)

    await storeEventType('Sign up', 'SIGN_UP', 1)
    await storeEventType('Sign up', 'SIGN_UP', 2)
    await storeEventType('Sign up', 'SIGN_UP', 3)

    await storeEventType('Download', 'DOWNLOAD', 1)
    await storeEventType('Download', 'DOWNLOAD', 2)
    await storeEventType('Download', 'DOWNLOAD', 3)

    const countries = [
        'United States',
        'United States',
        'United States',
        'United States',
        'United Kingdom',
        'United Kingdom',
        'United Kingdom',
        'Algeria',
        'Brazil',
        'Brazil',
        'Denmark',
        'Sweden',
        'Norway',
    ]
    const devices = ['Phone', 'Phone', 'Phone', 'Tablet', 'Desktop', 'Desktop']
    const systems = [
        'iOS',
        'iOS',
        'iOS',
        'iOS',
        'iOS',
        'Android',
        'Android',
        'Android',
        'iPadOS',
        'macOS',
        'macOS',
        'Windows',
        'Windows',
        'Windows',
        'Linux',
    ]
    const browsers = [
        'Chrome',
        'Chrome',
        'Chrome',
        'Firefox',
        'Edge',
        'Safari',
        'Safari',
    ]
    const referrers = [
        'github.com',
        'github.com',
        'github.com',
        'google.com',
        'google.com',
        'google.com',
        'google.com',
        'google.com',
        'reddit.com',
        'indiehackers.com',
        'linkedin.com',
        'twitter.com',
        'twitter.com',
        'facebook.com',
        'facebook.com',
        'facebook.com',
    ]
    const paths = [
        '/',
        '/',
        '/',
        '/',
        '/',
        '/about',
        '/about',
        '/about',
        '/products',
        '/products',
        '/products/1',
        '/products/2',
        '/products/3',
        '/products/4',
    ]
    const trackees = [
        '9c5e444b-4eb4-4833-bedf-51661b71d168',
        'eee3acf1-b9f8-4265-9c39-3100caf0dcca',
        '53a6e126-62ba-476e-8bae-1422807bb036',
        '1ccbbd1b-8e8b-4bd5-8cbf-d840d9e0316d',
        'aa01b366-07f2-4c4f-b44c-122d324d62f7',
        '764ad4b4-5394-47bf-b063-7eabb106a764',
        '99b10dd4-1356-40ba-86e0-aa582a7bf468',
    ]

    // Create events for each event type
    for (let i = 0; i < 9; i++) {
        const id = i + 1
        let count = 0

        for (let j = 0; j < Math.floor(Math.random() * 200) + 5; j++) {
            const trackee =
                trackees[Math.floor(Math.random() * trackees.length)]
            const country =
                countries[Math.floor(Math.random() * countries.length)]
            const device = devices[Math.floor(Math.random() * devices.length)]
            const os = systems[Math.floor(Math.random() * systems.length)]
            const browser =
                browsers[Math.floor(Math.random() * browsers.length)]
            const referrer =
                referrers[Math.floor(Math.random() * referrers.length)]
            const value =
                i < 3 ? paths[Math.floor(Math.random() * paths.length)] : null

            await storeEvent(
                id,
                trackee,
                value,
                referrer,
                country,
                browser,
                device,
                os
            )
        }
    }

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

const getRefreshTokenByToken = async token => {
    const db = await getConnection()
    const results = await db.query(
        SqlString.format(
            'SELECT * FROM refresh_tokens WHERE token = ? LIMIT 1',
            [token]
        )
    )
    await db.end()
    return results[0]
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

const getProjectsByUserId = async id => {
    const db = await getConnection()
    const results = await db.query(
        SqlString.format('SELECT * FROM projects WHERE user_id = ?', [id])
    )
    await db.end()

    return results
}

const getProjectByIdAndUserId = async (id, user_id) => {
    const db = await getConnection()
    const results = await db.query(
        SqlString.format(
            'SELECT * FROM projects WHERE id = ? AND user_id = ?',
            [id, user_id]
        )
    )
    await db.end()

    return results.length ? results[0] : null
}

const getProjectById = async id => {
    const db = await getConnection()
    const results = await db.query(
        SqlString.format('SELECT * FROM projects WHERE id = ?', [id])
    )
    await db.end()

    return results.length ? results[0] : null
}

const storeProject = async (name, user_id) => {
    const db = await getConnection()
    await db.query(
        SqlString.format('INSERT INTO projects (name, user_id) VALUES (?, ?)', [
            name,
            user_id,
        ])
    )
    const result = await db.query(
        SqlString.format('SELECT * FROM projects WHERE id = LAST_INSERT_ID()')
    )
    await db.end()

    return result[0]
}

const updateProject = async (id, name) => {
    const db = await getConnection()
    const results = await db.query(
        SqlString.format('UPDATE projects SET name = ? WHERE id = ?', [
            name,
            id,
        ])
    )
    await db.end()

    const result = await getProjectById(id)

    return result
}

const deleteProject = async id => {
    const db = await getConnection()
    await db.query(SqlString.format('DELETE FROM projects WHERE id = ?', [id]))
    await db.end()
}

const storeEventType = async (name, identifier, project_id) => {
    const db = await getConnection()
    await db.query(
        SqlString.format(
            'INSERT INTO event_types (name, identifier, project_id) VALUES (?, ?, ?)',
            [name, identifier, project_id]
        )
    )
    const result = await db.query(
        SqlString.format(
            'SELECT * FROM event_types WHERE id = LAST_INSERT_ID()'
        )
    )
    await db.end()

    return result[0]
}

const getEventTypeById = async id => {
    const db = await getConnection()
    const results = await db.query(
        SqlString.format('SELECT * FROM event_types WHERE id = ?', [id])
    )
    await db.end()

    return results.length ? results[0] : null
}

const getEventTypeByIdentifierAndProject = async (identifier, project_id) => {
    const db = await getConnection()
    const results = await db.query(
        SqlString.format(
            'SELECT * FROM event_types WHERE identifier = ? AND project_id = ?',
            [identifier, project_id]
        )
    )
    await db.end()

    return results.length ? results[0] : null
}

const getEventsByProjectIds = async (project_ids = []) => {
    const db = await getConnection()
    const results = await db.query(
        SqlString.format('SELECT * FROM event_types WHERE project_id IN (?)', [
            project_ids,
        ])
    )
    await db.end()

    return results
}

const deleteEventType = async id => {
    const db = await getConnection()
    await db.query(
        SqlString.format('DELETE FROM event_types WHERE id = ?', [id])
    )
    await db.end()
}

const storeEvent = async (
    event_type_id,
    trackee,
    value,
    referrer,
    country,
    browser,
    device,
    os
) => {
    const db = await getConnection()
    await db.query(
        SqlString.format(
            'INSERT INTO events (event_type_id, trackee, value, referrer, country, browser, device, os) VALUES (?)',
            [
                [
                    event_type_id,
                    trackee,
                    value,
                    referrer,
                    country,
                    browser,
                    device,
                    os,
                ],
            ]
        )
    )
    await db.end()
}

module.exports = {
    setup,
    getUserByEmail,
    storeUser,
    updateUser,
    getRefreshTokenByToken,
    storeRefreshToken,
    deleteRefreshToken,
    getProjectById,
    getProjectsByUserId,
    getProjectByIdAndUserId,
    storeProject,
    updateProject,
    deleteProject,
    storeEventType,
    getEventTypeById,
    getEventTypeByIdentifierAndProject,
    getEventsByProjectIds,
    deleteEventType,
    storeEvent,
}
