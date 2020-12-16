import React, { Children, cloneElement, useContext } from 'react'
import { useState } from '@hookstate/core'

import authState from '~/state/auth'

import Header from '@/partials/Header'
import Container from '@/partials/Container'

const Shell = ({ children, ...props }) => {
    const authenticated = useState(authState).authenticated

    return (
        <div>
            <Container>
                <Header authenticated={authenticated.get()} />
                <main>{children}</main>
            </Container>
        </div>
    )
}

export default Shell
