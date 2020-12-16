import React from 'react'

import { useClasses, propToClasses } from '~/hooks/useClasses'

import Box from '@/primitives/Box'

const Grid = ({ columns = 1, gap, className = '', children, ...props }) => {
    const classes = useClasses(
        className,
        propToClasses({ df: 1, md: columns }, value => `grid-cols-${value}`),
        propToClasses(gap, value => `gap-${value}`)
    )

    return (
        <Box display="grid" className={classes} {...props}>
            {children}
        </Box>
    )
}

export default Grid
