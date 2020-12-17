import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import Home from '@/pages/Home'
import Dashboard from '@/pages/Dashboard'
import Settings from '@/pages/Settings'
import Login from '@/pages/Login'
import Logout from '@/pages/Logout'
import Register from '@/pages/Register'
import ProjectCreate from '@/pages/ProjectCreate'
import Project from '@/pages/Project'
import Event from '@/pages/Event'

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
        component: ProjectCreate,
        type: ProtectedRoute,
        path: '/projects/create',
    },
    {
        component: Project,
        type: ProtectedRoute,
        path: '/projects/:id',
    },
    {
        component: Event,
        type: ProtectedRoute,
        path: '/events/:id',
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
    return (
        <Router>
            <Switch>
                {routes.map(route => (
                    <route.type
                        key={route.path}
                        {...route.props}
                        path={route.path}
                    >
                        <route.component />
                    </route.type>
                ))}
            </Switch>
        </Router>
    )
}

export default App
