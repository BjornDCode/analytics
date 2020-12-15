import React from 'react'

import Box from '@/primitives/Box'
import Link from '@/routes/Link'

const NavigationLink = ({ children, to, ...props }) => (
    <Box Component={Link} to={to} {...props} className="text-gray-700">
        {children}
    </Box>
)

export default NavigationLink
