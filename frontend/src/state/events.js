import { createState } from '@hookstate/core'

import api from '~/helpers/api'
import { keyById } from '~/helpers/methods'

export const fetchEvents = () => {
    state.status.set('loading')

    api.get('/event-types', (response, { eventTypes = [] }) => {
        state.items.set(keyById(eventTypes))
        state.status.set('fetched')
    })
}

export const createEventType = (
    { name = '', identifier = '', project_id },
    callback = () => {}
) => {
    api.post(
        '/event-types',
        { name, identifier, project_id },
        (response, data) => {
            if ([404, 422].includes(response.status)) {
                state.message.set(data.message)
                return
            }

            state.items[data.eventType.id].set(data.eventType)
            callback(data.eventType)
        }
    )
}

export const state = createState({
    status: 'loading',
    message: '',
    items: {},
})
