import React, { Fragment } from 'react'

import Link from '@/routes/Link'

const Header = ({ authenticated }) => {
    return (
        <header>
            <Link to="/">Analytics</Link>

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
    )
}

export default Header
