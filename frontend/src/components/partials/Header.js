import React, { Fragment, useState } from 'react'

import Link from '@/routes/Link'

import Box from '@/primitives/Box'
import Text from '@/primitives/Text'
import Icon from '@/primitives/Icon'
import Shelf from '@/primitives/Shelf'
import NavigationLink from '@/partials/NavigationLink'

const Header = ({ authenticated }) => {
    const [show, setShow] = useState(false)
    console.log('show', show)

    return (
        <header>
            <Shelf justify="between" spaceY={2} spaceX={{ df: 2, lg: 8 }}>
                <Link to="/">
                    <Text color="gray" shade="800" weight="semibold">
                        Analytics
                    </Text>
                </Link>

                <button type="button" onClick={() => setShow(!show)}>
                    <Icon name="Menu" />
                </button>
            </Shelf>

            <Box
                Component="nav"
                display={{ df: show ? 'block' : 'hidden', md: 'block' }}
            >
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
            </Box>
        </header>
    )
}

export default Header
