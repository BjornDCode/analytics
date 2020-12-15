import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'

import AuthenticationContext from '~/state/AuthenticationContext'

const PublicRoute = ({ redirect = '/dashboard', ...props }) => {
    const authenticated = useContext(AuthenticationContext)

    return authenticated ? <Redirect to={redirect} /> : <Route {...props} />
}

export default PublicRoute
