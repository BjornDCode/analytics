import React from 'react'

import { useClasses, propToClasses } from '~/hooks/useClasses'

import Box from '@/primitives/Box'

const Stack = ({ className = '', spacing, children, ...props }) => {
    const [classes] = useClasses(
        className,
        propToClasses(spacing, value => `space-y-${value}`)
    )

    return (
        <Box className={classes} {...props}>
            {children}
        </Box>
    )
}

export default Stack
