import React from 'react'

import Box from '@/primitives/Box'

const ListItem = ({ Component = 'li', children, ...props }) => (
    <Box Component={Component} {...props}>
        {children}
    </Box>
)

export default ListItem
