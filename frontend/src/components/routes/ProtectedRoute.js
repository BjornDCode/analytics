import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ authenticated, redirect = '', ...props }) =>
    !authenticated ? <Redirect to={redirect} /> : <Route {...props} />

export default ProtectedRoute
