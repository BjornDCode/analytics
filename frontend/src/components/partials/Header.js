import React, { Fragment } from 'react'

import Box from '@/primitives/Box'
import Icon from '@/primitives/Icon'
import Link from '@/routes/Link'
import NavigationLink from '@/partials/NavigationLink'

const Header = ({ authenticated }) => {
    return (
        <header>
            <Box
                spaceY={2}
                spaceX={{ df: 2, lg: 8 }}
                display="flex"
                justify="between"
            >
                <Link to="/" className="text-pink-500">
                    Analytics
                </Link>

                <button type="button">
                    <Icon name="Menu" />
                </button>
            </Box>

            <nav>
                {authenticated && (
                    <Fragment>
                        <NavigationLink to="/dashboard">
                            Dashboard
                        </NavigationLink>
                        <NavigationLink to="/Settings">Settings</NavigationLink>
                        <NavigationLink to="/logout">Logout</NavigationLink>
                    </Fragment>
                )}
                {!authenticated && (
                    <Fragment>
                        <NavigationLink to="/login">Login</NavigationLink>
                        <NavigationLink to="/register">Register</NavigationLink>
                    </Fragment>
                )}
            </nav>
        </header>
    )
}

export default Header
