import React, { Children, cloneElement, useContext } from 'react'
import { useState } from '@hookstate/core'

import authState from '~/state/auth'

import Box from '@/primitives/Box'
import Header from '@/partials/Header'
import Container from '@/partials/Container'

const Shell = ({ children, ...props }) => {
    const authenticated = useState(authState).authenticated

    return (
        <div>
            <Container>
                <Header authenticated={authenticated.get()} />
                <Box
                    Component="main"
                    space={{ df: 2, md: 0 }}
                    spaceB={{ df: 12, md: 12 }}
                >
                    {children}
                </Box>
            </Container>
        </div>
    )
}

export default Shell
