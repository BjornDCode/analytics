import React, { Fragment, useState } from 'react'

import Link from '@/routes/Link'
import Icon from '@/primitives/Icon'
import Shelf from '@/primitives/Shelf'
import NavigationLink from '@/partials/NavigationLink'

const Header = ({ authenticated }) => {
    const [show, setShow] = useState(false)

    return (
        <header>
            <Shelf justify="between" spaceY={2} spaceX={{ df: 2, lg: 8 }}>
                <Link to="/" className="text-pink-500">
                    Analytics
                </Link>

                <button type="button">
                    <Icon name="Menu" />
                </button>
            </Shelf>

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
