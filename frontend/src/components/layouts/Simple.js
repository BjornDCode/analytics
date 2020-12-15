import React, { Children, cloneElement, useContext } from 'react'

import Header from '@/partials/Header'

import AuthenticationContext from '~/state/AuthenticationContext'

const Simple = ({ children, ...props }) => {
    const authenticated = useContext(AuthenticationContext)

    return (
        <div>
            <Header authenticated={authenticated} />
            <main>{children}</main>
        </div>
    )
}

export default Simple
