import React, { Fragment, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Home from '@/pages/Home'
import Dashboard from '@/pages/Dashboard'
import Settings from '@/pages/Settings'
import Login from '@/pages/Login'
import Logout from '@/pages/Logout'
import Register from '@/pages/Register'

import PublicRoute from '@/routes/PublicRoute'
import ProtectedRoute from '@/routes/ProtectedRoute'

const App = () => {
    const [authenticated, setAuthenticated] = useState(
        !!localStorage.getItem('accessToken')
    )

    return (
        <Router>
            <div className="app">
                <header>
                    <Link to="/">Auth App</Link>

                    <nav>
                        {authenticated && (
                            <Fragment>
                                <Link to="/dashboard">Dashboard</Link>
                                <Link to="/Settings">Settings</Link>
                                <Link to="/logout">Logout</Link>
                            </Fragment>
                        )}
                        {!authenticated && (
                            <Fragment>
                                <Link to="/login">Login</Link>
                                <Link to="/register">Register</Link>
                            </Fragment>
                        )}
                    </nav>
                </header>

                <main>
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <ProtectedRoute
                            authenticated={authenticated}
                            redirect="/login"
                            path="/dashboard"
                        >
                            <Dashboard />
                        </ProtectedRoute>
                        <ProtectedRoute
                            authenticated={authenticated}
                            redirect="/login"
                            path="/settings"
                        >
                            <Settings />
                        </ProtectedRoute>
                        <ProtectedRoute
                            authenticated={authenticated}
                            redirect="/login"
                            path="/logout"
                        >
                            <Logout onLogout={() => setAuthenticated(false)} />
                        </ProtectedRoute>
                        <PublicRoute
                            authenticated={authenticated}
                            redirect="/dashboard"
                            path="/login"
                        >
                            <Login onLogin={() => setAuthenticated(true)} />
                        </PublicRoute>
                        <PublicRoute
                            authenticated={authenticated}
                            redirect="/dashboard"
                            path="/register"
                        >
                            <Register />
                        </PublicRoute>
                        )}
                    </Switch>
                </main>
            </div>
        </Router>
    )
}

export default App
