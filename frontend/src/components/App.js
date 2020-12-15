import React, { useState } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import AuthenticationContext from '~/state/AuthenticationContext'

import Home from '@/pages/Home'
import Dashboard from '@/pages/Dashboard'
import Settings from '@/pages/Settings'
import Login from '@/pages/Login'
import Logout from '@/pages/Logout'
import Register from '@/pages/Register'

import Route from '@/routes/Route'
import PublicRoute from '@/routes/PublicRoute'
import ProtectedRoute from '@/routes/ProtectedRoute'

const routes = [
    {
        component: Home,
        type: Route,
        path: '/',
        props: {
            exact: true,
        },
    },
    {
        component: Dashboard,
        type: ProtectedRoute,
        path: '/dashboard',
    },
    {
        component: Settings,
        type: ProtectedRoute,
        path: '/settings',
    },
    {
        component: Logout,
        type: ProtectedRoute,
        path: '/logout',
    },
    {
        component: Login,
        type: PublicRoute,
        path: '/login',
    },
    {
        component: Register,
        type: PublicRoute,
        path: '/register',
    },
]

const App = () => {
    const [authenticated, setAuthenticated] = useState(
        !!localStorage.getItem('accessToken')
    )

    return (
        <AuthenticationContext.Provider value={authenticated}>
            <Router>
                <Switch>
                    {routes.map(route => (
                        <route.type
                            key={route.path}
                            {...route.props}
                            path={route.path}
                        >
                            <route.component
                                setAuthenticated={setAuthenticated}
                            />
                        </route.type>
                    ))}
                </Switch>
            </Router>
        </AuthenticationContext.Provider>
    )
}

export default App
