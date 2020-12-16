import React from 'react'

import Box from '@/primitives/Box'
import Text from '@/primitives/Text'
import Link from '@/routes/Link'

const NavigationLink = ({ children, to, ...props }) => (
    <Box
        Component={Link}
        to={to}
        {...props}
        display="block"
        spaceX={2}
        spaceY={2}
        className="border-x border-b first:border-t"
    >
        <Text
            color="gray"
            shade={{ df: '700', hover: '900' }}
            weight="medium"
            size="sm"
        >
            {children}
        </Text>
    </Box>
)

export default NavigationLink
