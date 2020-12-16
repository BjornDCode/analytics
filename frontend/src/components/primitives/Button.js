import React from 'react'

import { match } from '~/helpers/methods'

import Box from '@/primitives/Box'
import Text from '@/primitives/Text'

const Button = ({
    Component = 'button',
    type = 'button',
    size = 'medium',
    children,
    ...props
}) => {
    const space = match(size, {
        small: {
            x: 4,
            y: 1,
        },
        medium: {
            x: 8,
            y: 2,
        },
    })
    return (
        <Box
            Component={Component}
            type={type}
            backgroundColor="indigo"
            backgroundShade={{ df: '700', hover: '800' }}
            border="1"
            borderColor="indigo"
            borderShade="900"
            spaceX={space.x}
            spaceY={space.y}
            borderRadius="normal"
            {...props}
        >
            <Text color="indigo" shade="100" size="sm" weight="semibold">
                {children}
            </Text>
        </Box>
    )
}

export default Button
