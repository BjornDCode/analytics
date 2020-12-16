import React from 'react'
import { useState } from '@hookstate/core'

import api from '~/helpers/api'
import authState from '~/state/auth'

import Simple from '@/layouts/Simple'

import Stack from '@/primitives/Stack'
import Shelf from '@/primitives/Shelf'
import Button from '@/primitives/Button'

import Form from '@/forms/Form'
import FormGroup from '@/forms/FormGroup'
import FormLabel from '@/forms/FormLabel'
import FormInput from '@/forms/FormInput'
import FormError from '@/forms/FormError'

const Login = () => {
    const authenticated = useState(authState).authenticated
    const error = useState(false)
    const form = useState({
        email: '',
        password: '',
    })
    const update = (key, value) => form[key].set(value)

    const login = async ({ email, password }) => {
        api.post('/login', { email, password }, (response, data) => {
            if (response.status !== 200) {
                return error.set(data.message)
            }

            localStorage.setItem('accessToken', data.accessToken)
            localStorage.setItem('refreshToken', data.refreshToken)
            authenticated.set(true)
        })
    }

    return (
        <Simple headline="Login">
            <Stack
                Component={Form}
                spacing={4}
                onSubmit={() => login(form.get())}
            >
                <FormGroup>
                    <FormLabel>Email</FormLabel>
                    <FormInput
                        type="email"
                        name="email"
                        placeholder="John"
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
                <Shelf justify="end">
                    <Button type="submit">Login</Button>
                </Shelf>

                {error.get() && <FormError>{error.get()}</FormError>}
            </Stack>
        </Simple>
    )
}

export default Login
