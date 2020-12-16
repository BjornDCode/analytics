import React from 'react'

import Stack from '@/primitives/Stack'

const FormGroup = ({ children, ...props }) => (
    <Stack spacing={1} {...props}>
        {children}
    </Stack>
)

export default FormGroup
