import { createState } from '@hookstate/core'

const state = createState({
    authenticated: !!localStorage.getItem('accessToken'),
})

export default state
