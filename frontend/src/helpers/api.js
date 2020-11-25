const get = async () => {}

const post = async (endpoint, body = {}, callback = () => {}) => {
    const accessToken = localStorage.getItem('accessToken')

    let response = await fetch(`http://localhost:8080${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(accessToken
                ? {
                      Authorization: `Bearer ${accessToken}`,
                  }
                : {}),
        },
        body: JSON.stringify(body),
    })

    const data = await response.json()

    callback(response, data)
}

module.exports = {
    get,
    post,
}
