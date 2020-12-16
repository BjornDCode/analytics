import { Link as ReactRouterLink } from 'react-router-dom'

import Box from '@/primitives/Box'

const Link = ({ children, ...props }) => (
    <Box Component={ReactRouterLink} {...props}>
        {children}
    </Box>
)

export default Link
