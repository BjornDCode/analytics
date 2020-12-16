import React from 'react'

import { useClasses, propToClasses } from '~/hooks/useClasses'

import Box from '@/primitives/Box'

const Grid = ({ span = 1, className = '', children, ...props }) => {
    const classes = useClasses(
        className,
        propToClasses({ df: 1, md: span }, value => `col-span-${value}`)
    )

    return (
        <Box className={classes} {...props}>
            {children}
        </Box>
    )
}

export default Grid
