import React from 'react'

import Link from '@/routes/Link'
import Button from '@/primitives/Button'

const LinkButton = ({ to, children, ...props }) => (
    <Button Component={Link} to={to} {...props}>
        {children}
    </Button>
)

export default LinkButton
