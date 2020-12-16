import React from 'react'

import Box from '@/primitives/Box'

const FormInput = ({
    type = 'text',
    placeholder = '',
    value,
    onChange = () => {},
    ...props
}) => (
    <Box
        Component="input"
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        display="block"
        width="full"
        spaceX="4"
        spaceY="3"
        borderRadius="md"
        border="1"
        borderColor={{ df: 'gray', focus: 'indigo' }}
        borderShade={{ df: '300', focus: '700' }}
        className="text-sm focus:outline-none"
        {...props}
    />
)

export default FormInput
