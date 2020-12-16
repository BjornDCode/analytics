import React, { Fragment, useState } from 'react'

import Link from '@/routes/Link'

import Box from '@/primitives/Box'
import Text from '@/primitives/Text'
import Icon from '@/primitives/Icon'
import Shelf from '@/primitives/Shelf'
import NavigationLink from '@/partials/NavigationLink'

const Header = ({ authenticated }) => {
    const [show, setShow] = useState(false)

    return (
        <Box
            display={{ md: 'flex' }}
            justify={{ md: 'between' }}
            spaceY={{ md: 6 }}
        >
            <Shelf justify="between" space={{ df: 2, md: 0 }}>
                <Link to="/">
                    <Text color="gray" shade="800" weight="semibold">
                        Analytics
                    </Text>
                </Link>

                <Box
                    Component="button"
                    type="button"
                    onClick={() => setShow(!show)}
                    display={{ md: 'hidden' }}
                >
                    <Icon name="Menu" />
                </Box>
            </Shelf>

            <Box
                Component="nav"
                display={{ df: show ? 'block' : 'hidden', md: 'flex' }}
                className="md:space-x-4"
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
        </Box>
    )
}

export default Header
