import React from 'react'

import Shell from '@/layouts/Shell'

import Box from '@/primitives/Box'
import Stack from '@/primitives/Stack'
import Headline from '@/primitives/Headline'

const Simple = ({ headline, children, ...props }) => (
    <Shell>
        <Box className="max-w-xs" spaceY={24} marginX="auto">
            <Stack spacing={6}>
                <Headline level={1}>{headline}</Headline>

                <Box>{children}</Box>
            </Stack>
        </Box>
    </Shell>
)

export default Simple
