import React, { useEffect } from 'react'
import { useState } from '@hookstate/core'
import { Redirect } from 'react-router-dom'

import useUnmounted from '~/hooks/useUnmounted'
import { state as eventsState, createEventType } from '~/state/events'

import Stack from '@/primitives/Stack'
import Shelf from '@/primitives/Shelf'
import Button from '@/primitives/Button'
import Headline from '@/primitives/Headline'

import Form from '@/forms/Form'
import FormGroup from '@/forms/FormGroup'
import FormLabel from '@/forms/FormLabel'
import FormInput from '@/forms/FormInput'
import FormError from '@/forms/FormError'

const CreateEventTypesForm = ({ project }) => {
    const state = useState(eventsState)

    const createEventForm = useState({
        name: '',
        identifier: '',
        project_id: project.id,
    })

    useEffect(() => {
        update(createEventForm, 'project_id', project.id)
    }, [project])

    const update = (form, key, value) => form[key].set(value)
    const onSubmit = () => {
        createEventType(createEventForm.get(), () => {
            update(createEventForm, 'name', '')
            update(createEventForm, 'identifier', '')
        })
    }

    useUnmounted(() => {
        state.message.set('')
    })

    return (
        <Stack spacing={4}>
            <Headline level={3}>Add new event</Headline>
            <Stack Component={Form} spacing={4} onSubmit={onSubmit}>
                <FormGroup>
                    <FormLabel>Name</FormLabel>
                    <FormInput
                        type="text"
                        name="name"
                        placeholder="Page view"
                        value={createEventForm.name.get()}
                        onChange={event =>
                            update(createEventForm, 'name', event.target.value)
                        }
                    />
                </FormGroup>
                <FormGroup>
                    <FormLabel>Identifier</FormLabel>
                    <FormInput
                        type="text"
                        name="identifier"
                        placeholder="PAGE_VIEW"
                        value={createEventForm.identifier.get()}
                        onChange={event =>
                            update(
                                createEventForm,
                                'identifier',
                                event.target.value
                            )
                        }
                    />
                </FormGroup>

                <Shelf justify="end">
                    <Button type="submit">Create</Button>
                </Shelf>

                {state.message.get() && (
                    <FormError>{state.message.get()}</FormError>
                )}
            </Stack>
        </Stack>
    )
}

export default CreateEventTypesForm
