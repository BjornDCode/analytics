import React, { useState } from 'react'

const Login = ({ setAccessToken, setRefreshToken }) => {
    const [error, setError] = useState(false)
    const [form, setForm] = useState({ username: '', password: '' })
    const update = (key, value) => setForm({ ...form, [key]: value })

    const login = async ({ username, password }) => {
        let response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        })
        const data = await response.json()

        if (response.status !== 200) {
            return setError(data.message)
        }

        setAccessToken(data.accessToken)
        setRefreshToken(data.refreshToken)
    }

    const onSubmit = event => {
        event.preventDefault()
        login(form)
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="John"
                        value={form.username}
                        onChange={event =>
                            update('username', event.target.value)
                        }
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={event =>
                            update('password', event.target.value)
                        }
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    )
}

export default Login
