import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useState } from '@hookstate/core'

import authState from '~/state/auth'

const ProtectedRoute = ({ redirect = '/login', ...props }) => {
    const authenticated = useState(authState).authenticated.get()

    return !authenticated ? <Redirect to={redirect} /> : <Route {...props} />
}

export default ProtectedRoute
