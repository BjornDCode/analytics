import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import api from '../helpers/api'

const Logout = ({ onLogout }) => {
    const [finished, setFinished] = useState(false)

    api.post('/logout', {}, () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        setFinished(true)
        onLogout()
    })

    return finished ? <Redirect to="/" /> : <p>Logging out</p>
}

export default Logout
