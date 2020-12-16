import React from 'react'

import Text from '@/primitives/Text'

const FormError = ({ children, ...props }) => (
    <Text size="sm" color="red" shade="500">
        {children}
    </Text>
)

export default FormError
