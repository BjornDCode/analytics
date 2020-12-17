import React, { useEffect } from 'react'
import { useState } from '@hookstate/core'
import { Redirect } from 'react-router-dom'

import useUnmounted from '~/hooks/useUnmounted'
import { deleteProject } from '~/state/projects'

import Stack from '@/primitives/Stack'
import Shelf from '@/primitives/Shelf'
import Button from '@/primitives/Button'

import Form from '@/forms/Form'
import FormError from '@/forms/FormError'

const DeleteProjectForm = ({ state, project }) => {
    const finished = useState(false)
    const onSubmit = () => {
        deleteProject({ id: project.id }, () => {
            finished.set(true)
        })
    }

    useUnmounted(() => {
        state.message.set('')
    })

    return finished.get() ? (
        <Redirect to="/dashboard" />
    ) : (
        <Stack Component={Form} spacing={4} onSubmit={onSubmit}>
            <Shelf justify="end">
                <Button type="submit">Delete</Button>
            </Shelf>

            {state.message.get() && (
                <FormError>{state.message.get()}</FormError>
            )}
        </Stack>
    )
}

export default DeleteProjectForm
