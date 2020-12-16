import React from 'react'

import { useClasses, propToClasses } from '~/hooks/useClasses'

import Box from '@/primitives/Box'

const Shelf = ({
    className = '',
    display = 'flex',
    spacing,
    children,
    ...props
}) => {
    const classes = useClasses(
        className,
        propToClasses(spacing, value => `space-x-${value}`)
    )

    return (
        <Box className={classes} display={display} {...props}>
            {children}
        </Box>
    )
}

export default Shelf
