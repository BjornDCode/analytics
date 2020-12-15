import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import api from '~/helpers/api'

import Simple from '@/layouts/Simple'

const Register = () => {
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
    })
    const update = (key, value) => setForm({ ...form, [key]: value })

    const register = async data => {
        api.post('/register', data, (response, data) => {
            if (response.status !== 200) {
                return setError(data.message)
            }

            setSuccess(true)
        })
    }

    const onSubmit = event => {
        event.preventDefault()
        register(form)
    }

    return success ? (
        <Redirect to="/login" />
    ) : (
        <Simple>
            <h1>Register</h1>
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
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="test@example.com"
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
                <div>
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        name="password_confirmation"
                        placeholder="Confirm password"
                        value={form.password_confirmation}
                        onChange={event =>
                            update('password_confirmation', event.target.value)
                        }
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
        </Simple>
    )
}

export default Register
