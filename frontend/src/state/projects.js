import { createState } from '@hookstate/core'

import api from '~/helpers/api'
import { keyById } from '~/helpers/methods'

export const state = createState({
    status: 'loading',
    items: {},
})

export const fetchProjects = () => {
    state.status.set('loading')

    api.get('/projects', (response, { projects = [] }) => {
        state.items.set(keyById(projects))
        state.status.set('fetched')
    })
}
