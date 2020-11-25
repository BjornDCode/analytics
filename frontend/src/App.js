import React, { Fragment, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import Login from './pages/Login'
import Register from './pages/Register'

import PublicRoute from './components/PublicRoute'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()

    const authenticated = () => !!accessToken

    return (
        <Router>
            <div className="app">
                <header>
                    <Link to="/">Auth App</Link>

                    <nav>
                        {authenticated() && (
                            <Fragment>
                                <Link to="/dashboard">Dashboard</Link>
                                <Link to="/Settings">Settings</Link>
                            </Fragment>
                        )}
                        {!authenticated() && (
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
                            authenticated={authenticated()}
                            redirect="/login"
                            path="/dashboard"
                        >
                            <Dashboard />
                        </ProtectedRoute>
                        <ProtectedRoute
                            authenticated={authenticated()}
                            redirect="/login"
                            path="/settings"
                        >
                            <Settings />
                        </ProtectedRoute>
                        <PublicRoute
                            authenticated={authenticated()}
                            redirect="/dashboard"
                            path="/login"
                        >
                            <Login
                                setAccessToken={setAccessToken}
                                setRefreshToken={setRefreshToken}
                            />
                        </PublicRoute>
                        <PublicRoute
                            authenticated={authenticated()}
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
