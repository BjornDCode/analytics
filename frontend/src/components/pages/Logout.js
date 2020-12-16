import React from 'react'
import { Redirect } from 'react-router-dom'
import { useState } from '@hookstate/core'

import api from '~/helpers/api'
import authState from '~/state/auth'
import useMounted from '~/hooks/useMounted'

import Shell from '@/layouts/Shell'

const Logout = () => {
    const authenticated = useState(authState).authenticated

    useMounted(() => {
        api.post('/logout', {}, () => {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            authenticated.set(false)
        })
    })

    return (
        <Shell>
            <p>Logging out</p>
        </Shell>
    )
}

export default Logout
