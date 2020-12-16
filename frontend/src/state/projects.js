import { createState } from '@hookstate/core'

const state = createState({
    1: {
        id: 1,
        name: 'useserve.app',
    },
    2: {
        id: 2,
        name: 'branchci.com',
    },
    3: {
        id: 3,
        name: 'shopify.com',
    },
})

export default state
