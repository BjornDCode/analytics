import React from 'react'
import { Redirect } from 'react-router-dom'
import { useState } from '@hookstate/core'

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
    const error = useState(false)
    const success = useState(false)
    const form = useState({
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
    })
    const update = (key, value) => form[key].set(value)

    const register = async data => {
        api.post('/register', data, (response, data) => {
            if (response.status !== 200) {
                return error.set(data.message)
            }

            success.set(true)
        })
    }

    return success.get() ? (
        <Redirect to="/login" />
    ) : (
        <Simple headline="Register">
            <Stack
                Component={Form}
                spacing={4}
                onSubmit={() => register(form.get())}
            >
                <FormGroup>
                    <FormLabel>Username</FormLabel>
                    <FormInput
                        type="text"
                        name="username"
                        placeholder="John"
                        value={form.username.get()}
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
                        value={form.email.get()}
                        onChange={event => update('email', event.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <FormLabel>Password</FormLabel>
                    <FormInput
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password.get()}
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
                        value={form.password_confirmation.get()}
                        onChange={event =>
                            update('password_confirmation', event.target.value)
                        }
                    />
                </FormGroup>

                <Shelf justify="end">
                    <Button type="submit">Register</Button>
                </Shelf>

                {error.get() && <FormError>{error.get()}</FormError>}
            </Stack>
        </Simple>
    )
}

export default Register
