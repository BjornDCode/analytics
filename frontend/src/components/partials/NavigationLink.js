import React from 'react'
import Link from '@/routes/Link'

const NavigationLink = ({ children, to, ...props }) => (
    <Link to={to} {...props} className="text-gray-700">
        {children}
    </Link>
)

export default NavigationLink
