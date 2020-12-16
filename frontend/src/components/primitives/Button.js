import React from 'react'

import Box from '@/primitives/Box'
import Text from '@/primitives/Text'

const Button = ({
    Component = 'button',
    type = 'button',
    children,
    ...props
}) => (
    <Box
        Component={Component}
        type={type}
        backgroundColor="indigo"
        backgroundShade={{ df: '700', hover: '800' }}
        border="1"
        borderColor="indigo"
        borderShade="900"
        spaceX="8"
        spaceY="2"
        borderRadius="normal"
    >
        <Text color="indigo" shade="100" size="sm" weight="semibold">
            {children}
        </Text>
    </Box>
)

export default Button
