import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import api from '~/helpers/api'

import Simple from '@/layouts/Simple'

import Stack from '@/primitives/Stack'
import Shelf from '@/primitives/Shelf'
import Button from '@/primitives/Button'

import Form from '@/forms/Form'
import FormGroup from '@/forms/FormGroup'
import FormLabel from '@/forms/FormLabel'
import FormInput from '@/forms/FormInput'
import FormError from '@/forms/FormError'

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

    return success ? (
        <Redirect to="/login" />
    ) : (
        <Simple headline="Register">
            <Stack Component={Form} spacing={4} onSubmit={() => register(form)}>
                <FormGroup>
                    <FormLabel>Username</FormLabel>
                    <FormInput
                        type="text"
                        name="username"
                        placeholder="John"
                        value={form.username}
                        onChange={event =>
                            update('username', event.target.value)
                        }
                    />
                </FormGroup>
                <FormGroup>
                    <FormLabel>Email</FormLabel>
                    <FormInput
                        type="email"
                        name="email"
                        placeholder="test@example.com"
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
                <FormGroup>
                    <FormLabel>Confirm password</FormLabel>
                    <FormInput
                        type="password"
                        name="password_confirmation"
                        placeholder="Confirm password"
                        value={form.password_confirmation}
                        onChange={event =>
                            update('password_confirmation', event.target.value)
                        }
                    />
                </FormGroup>

                <Shelf justify="end">
                    <Button type="submit">Register</Button>
                </Shelf>

                {error && <FormError>{error}</FormError>}
            </Stack>
        </Simple>
    )
}

export default Register
