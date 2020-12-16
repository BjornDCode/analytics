import React from 'react'

import Box from '@/primitives/Box'

const Container = ({ children, ...props }) => (
    <Box className="lg:max-w-6xl" marginX={{ lg: 'auto' }} {...props}>
        {children}
    </Box>
)

export default Container
