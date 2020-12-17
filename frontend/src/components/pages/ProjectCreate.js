import React from 'react'
import { useState } from '@hookstate/core'
import { Redirect } from 'react-router-dom'

import { state as projectsState, createProject } from '~/state/projects'
import useUnmounted from '~/hooks/useUnmounted'

import Shelf from '@/primitives/Shelf'
import Stack from '@/primitives/Stack'
import Button from '@/primitives/Button'

import Form from '@/forms/Form'
import FormGroup from '@/forms/FormGroup'
import FormLabel from '@/forms/FormLabel'
import FormInput from '@/forms/FormInput'
import FormError from '@/forms/FormError'

import Simple from '@/layouts/Simple'

const ProjectCreate = () => {
    const state = useState(projectsState)
    const form = useState({
        name: '',
    })
    const finished = useState(false)

    const update = (key, value) => form[key].set(value)
    const onSubmit = () => {
        createProject(form.get(), () => {
            finished.set(true)
        })
    }

    useUnmounted(() => {
        state.message.set('')
    })

    return finished.get() ? (
        <Redirect to="/dashboard" />
    ) : (
        <Simple headline="Create project">
            <Stack Component={Form} spacing={4} onSubmit={onSubmit}>
                <FormGroup>
                    <FormLabel>Name</FormLabel>
                    <FormInput
                        type="text"
                        name="name"
                        placeholder="useserve.app"
                        value={form.name.get()}
                        onChange={event => update('name', event.target.value)}
                    />
                </FormGroup>
                <Shelf justify="end">
                    <Button type="submit">Create</Button>
                </Shelf>

                {state.message.get() && (
                    <FormError>{state.message.get()}</FormError>
                )}
            </Stack>
        </Simple>
    )
}

export default ProjectCreate
