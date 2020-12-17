import { createState } from '@hookstate/core'

import api from '~/helpers/api'
import { keyById } from '~/helpers/methods'

export const state = createState({})

export const fetchProjects = () => {
    api.get('/projects', (response, { projects = [] }) => {
        state.set(keyById(projects))
    })
}
