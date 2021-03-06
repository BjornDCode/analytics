import React from 'react'

import Box from '@/primitives/Box'

const Container = ({ children, ...props }) => (
    <Box
        className="lg:max-w-6xl"
        marginX={{ lg: 'auto' }}
        spaceX={{ md: 8, xl: 0 }}
        {...props}
    >
        {children}
    </Box>
)

export default Container
