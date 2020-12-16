import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useState } from '@hookstate/core'

import authState from '~/state/auth'

const PublicRoute = ({ redirect = '/dashboard', ...props }) => {
    const authenticated = useState(authState).authenticated.get()

    return authenticated ? <Redirect to={redirect} /> : <Route {...props} />
}

export default PublicRoute
