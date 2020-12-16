import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import api from '~/helpers/api'

import Simple from '@/layouts/Simple'

const Logout = ({ setAuthenticated }) => {
    const [finished, setFinished] = useState(false)

    useEffect(() => {
        api.post('/logout', {}, () => {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            setFinished(true)
            setAuthenticated(false)
        })
    }, [])

    return finished ? (
        <Redirect to="/" />
    ) : (
        <Simple>
            <p>Logging out</p>
        </Simple>
    )
}

export default Logout
