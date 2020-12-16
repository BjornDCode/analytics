import { createState } from '@hookstate/core'

const state = createState({
    1: {
        id: 1,
        name: 'Page view',
        identifier: 'PAGE_VIEW',
    },
    2: {
        id: 2,
        name: 'Sign up',
        identifier: 'SIGN_UP',
    },
    3: {
        id: 3,
        name: 'Download',
        identifier: 'DOWNLOAD',
    },
})

export default state
