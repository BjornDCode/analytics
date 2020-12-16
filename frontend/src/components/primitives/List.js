import React from 'react'

const List = ({ Component = 'ul', children, ...props }) => (
    <Component {...props}>{children}</Component>
)

export default List
