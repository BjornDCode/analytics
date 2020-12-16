import React, { useState } from 'react'

import api from '~/helpers/api'

import Auth from '@/layouts/Auth'

import Stack from '@/primitives/Stack'
import Shelf from '@/primitives/Shelf'
import Button from '@/primitives/Button'

import Form from '@/forms/Form'
import FormGroup from '@/forms/FormGroup'
import FormLabel from '@/forms/FormLabel'
import FormInput from '@/forms/FormInput'
import FormError from '@/forms/FormError'

const Login = ({ authenticated, setAuthenticated }) => {
    const [error, setError] = useState('This is an error message')
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
        <Auth headline="Login">
            <Stack Component={Form} spacing={4} onSubmit={onSubmit}>
                <FormGroup>
                    <FormLabel>Email</FormLabel>
                    <FormInput
                        type="email"
                        name="email"
                        placeholder="John"
                        value={form.email}
                        onChange={event => update('email', event.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <FormLabel>Password</FormLabel>
                    <FormInput
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={event =>
                            update('password', event.target.value)
                        }
                    />
                </FormGroup>
                <Shelf justify="end">
                    <Button type="submit">Login</Button>
                </Shelf>

                {error && <FormError>{error}</FormError>}
            </Stack>
        </Auth>
    )
}

export default Login
