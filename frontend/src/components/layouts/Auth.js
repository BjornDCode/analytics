import React from 'react'

import Simple from '@/layouts/Simple'

import Box from '@/primitives/Box'
import Stack from '@/primitives/Stack'
import Headline from '@/primitives/Headline'

const Auth = ({ headline, children, ...props }) => (
    <Simple>
        <Box className="max-w-xs" spaceY={24} marginX="auto">
            <Stack spacing={6}>
                <Headline level={1}>{headline}</Headline>

                <Box>{children}</Box>
            </Stack>
        </Box>
    </Simple>
)

export default Auth
