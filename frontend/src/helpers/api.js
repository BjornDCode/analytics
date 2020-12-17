const get = async (endpoint, callback) => {
    const accessToken = localStorage.getItem('accessToken')

    let response = await fetch(`http://localhost:8080${endpoint}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...(accessToken
                ? {
                      Authorization: `Bearer ${accessToken}`,
                  }
                : {}),
        },
    })

    if (response.status === 403) {
        post(
            '/token',
            { token: localStorage.getItem('refreshToken') },
            (response, data) => {
                localStorage.setItem('accessToken', data.accessToken)
                get(endpoint, callback)
            }
        )
        return
    }

    const data = await response.json()

    callback(response, data)
}

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

const put = async (endpoint, body = {}, callback = () => {}) => {
    const accessToken = localStorage.getItem('accessToken')

    let response = await fetch(`http://localhost:8080${endpoint}`, {
        method: 'PUT',
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

const api = {
    get,
    post,
    put,
}

export default api
