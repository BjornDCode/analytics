import React from 'react'

import { useClasses, propToClasses, propsToClasses } from '~/hooks/useClasses'

import Box from '@/primitives/Box'

const colorPropsToClasses = (color, shade) => {
    if (!shade) {
        return `text-${color}`
    }

    return `text-${color}-${shade}`
}

const Text = ({
    color,
    shade,
    weight,
    size,
    Component = 'span',
    className = '',
    children,
    ...props
}) => {
    const classes = useClasses(
        className,
        propsToClasses([color, shade], colorPropsToClasses),
        propToClasses(weight, weight => `font-${weight}`),
        propToClasses(size, size => `text-${size}`)
    )

    return (
        <Box Component={Component} className={classes} {...props}>
            {children}
        </Box>
    )
}

export default Text
