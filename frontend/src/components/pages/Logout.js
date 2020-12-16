import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import api from '~/helpers/api'
import useMounted from '~/hooks/useMounted'

import Shell from '@/layouts/Shell'

const Logout = ({ setAuthenticated }) => {
    const [finished, setFinished] = useState(false)

    useMounted(() => {
        api.post('/logout', {}, () => {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            setFinished(true)
            setAuthenticated(false)
        })
    })

    return finished ? (
        <Redirect to="/" />
    ) : (
        <Shell>
            <p>Logging out</p>
        </Shell>
    )
}

export default Logout
