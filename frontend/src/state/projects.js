import { createState } from '@hookstate/core'

import api from '~/helpers/api'
import { keyById } from '~/helpers/methods'

export const state = createState({
    status: 'loading',
    message: '',
    items: {},
})

export const fetchProjects = () => {
    state.status.set('loading')

    api.get('/projects', (response, { projects = [] }) => {
        state.items.set(keyById(projects))
        state.status.set('fetched')
    })
}

export const createProject = ({ name = '' }, callback = () => {}) => {
    api.post('/projects', { name }, (response, data) => {
        if (response.status === 422) {
            state.message.set(data.message)
            return
        }

        state.items[data.project.id].set(data.project)
        callback(data.project)
    })
}

export const updateProject = ({ id, name = '' }, callback = () => {}) => {
    api.put(`/projects/${id}`, { name }, (response, data) => {
        if ([422, 404].includes(response.status)) {
            state.message.set(data.message)
            return
        }

        state.items[data.project.id].set(data.project)
        callback(data.project)
    })
}
