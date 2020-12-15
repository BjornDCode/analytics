import { Link as ReactRouterLink } from 'react-router-dom'

const Link = ({ children, ...props }) => (
    <ReactRouterLink {...props}>{children}</ReactRouterLink>
)

export default Link
