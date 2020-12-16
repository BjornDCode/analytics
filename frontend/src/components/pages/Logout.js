import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import api from '~/helpers/api'
import useMounted from '~/hooks/useMounted'

import Simple from '@/layouts/Simple'

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
        <Simple>
            <p>Logging out</p>
        </Simple>
    )
}

export default Logout
