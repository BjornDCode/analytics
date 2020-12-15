import { Route as ReactRouterRoute } from 'react-router-dom'

const Route = ({ children, ...props }) => (
    <ReactRouterRoute {...props}>{children}</ReactRouterRoute>
)

export default Route
