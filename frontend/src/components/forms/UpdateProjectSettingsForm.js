import React, { useEffect } from 'react'
import { useState } from '@hookstate/core'

import useUnmounted from '~/hooks/useUnmounted'
import { updateProject } from '~/state/projects'

import Stack from '@/primitives/Stack'
import Shelf from '@/primitives/Shelf'
import Button from '@/primitives/Button'

import Form from '@/forms/Form'
import FormInput from '@/forms/FormInput'
import FormLabel from '@/forms/FormLabel'
import FormError from '@/forms/FormError'
import FormGroup from '@/forms/FormGroup'

const UpdateProjectSettingsForm = ({ state, project }) => {
    const form = useState({
        id: project.id || '',
        name: project.name || '',
    })

    useEffect(() => {
        update('id', project.id)
        update('name', project.name)
    }, [project])

    const update = (key, value) => form[key].set(value)
    const onSubmit = () => {
        updateProject(form.get())
    }

    useUnmounted(() => {
        state.message.set('')
    })

    return (
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
                <Button type="submit">Update</Button>
            </Shelf>

            {state.message.get() && (
                <FormError>{state.message.get()}</FormError>
            )}
        </Stack>
    )
}

export default UpdateProjectSettingsForm
