import React, { useState } from 'react'

import api from '~/helpers/api'

import Simple from '@/layouts/Simple'

const Login = ({ authenticated, setAuthenticated }) => {
    const [error, setError] = useState(false)
    const [form, setForm] = useState({ email: '', password: '' })
    const update = (key, value) => setForm({ ...form, [key]: value })

    const login = async ({ email, password }) => {
        api.post('/login', { email, password }, (response, data) => {
            if (response.status !== 200) {
                return setError(data.message)
            }

            localStorage.setItem('accessToken', data.accessToken)
            localStorage.setItem('refreshToken', data.refreshToken)
            setAuthenticated(true)
        })
    }

    const onSubmit = event => {
        event.preventDefault()
        login(form)
    }

    return (
        <Simple>
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
        </Simple>
    )
}

export default Login
