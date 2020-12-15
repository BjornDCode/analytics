import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'

import AuthenticationContext from '~/state/AuthenticationContext'

const ProtectedRoute = ({ redirect = '/login', ...props }) => {
    const authenticated = useContext(AuthenticationContext)

    return !authenticated ? <Redirect to={redirect} /> : <Route {...props} />
}

export default ProtectedRoute
