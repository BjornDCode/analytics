import React, { Children, cloneElement, useContext } from 'react'

import Header from '@/partials/Header'
import Container from '@/partials/Container'

import AuthenticationContext from '~/state/AuthenticationContext'

const Simple = ({ children, ...props }) => {
    const authenticated = useContext(AuthenticationContext)

    return (
        <div>
            <Container>
                <Header authenticated={authenticated} />
                <main>{children}</main>
            </Container>
        </div>
    )
}

export default Simple
