import React, { useState } from 'react'

const Login = ({ setAccessToken, setRefreshToken }) => {
    const [error, setError] = useState(false)
    const [form, setForm] = useState({ email: '', password: '' })
    const update = (key, value) => setForm({ ...form, [key]: value })

    const login = async ({ email, password }) => {
        let response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
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
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="John"
                        value={form.email}
                        onChange={event => update('email', event.target.value)}
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
