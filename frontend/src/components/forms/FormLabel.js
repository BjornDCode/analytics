import React from 'react'

import Text from '@/primitives/Text'

const FormLabel = ({ children, ...props }) => (
    <Text
        Component="label"
        display="block"
        size="sm"
        color="gray"
        shade="600"
        {...props}
    >
        {children}
    </Text>
)

export default FormLabel
