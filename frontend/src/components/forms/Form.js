import React from 'react'

import Box from '@/primitives/Box'

const Form = ({ onSubmit = () => {}, children, ...props }) => {
    const handleSubmit = event => {
        event.preventDefault()
        onSubmit(event)
    }

    return (
        <Box Component="form" onSubmit={handleSubmit} {...props}>
            {children}
        </Box>
    )
}

export default Form
