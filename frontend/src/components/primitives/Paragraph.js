import React from 'react'

import Text from '@/primitives/Text'

const Paragraph = ({ children, ...props }) => <Text {...props}>{children}</Text>

export default Paragraph
