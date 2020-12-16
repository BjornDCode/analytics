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
        space={{ df: 2, md: 0 }}
        borderX={{ df: 1, md: 0 }}
        borderB={{ df: 1, md: 0 }}
        borderT={{ first: 1, 'md:first': 0 }}
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
