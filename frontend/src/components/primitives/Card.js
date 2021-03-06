import React from 'react'

import Box from '@/primitives/Box'
import Stack from '@/primitives/Stack'
import Headline from '@/primitives/Headline'

const Card = ({ children, ...props }) => (
    <Stack backgroundColor="white" borderRadius="md" border="1" {...props}>
        {children}
    </Stack>
)

export default Card
