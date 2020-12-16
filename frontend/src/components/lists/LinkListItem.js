import React from 'react'

import Link from '@/routes/Link'
import Text from '@/primitives/Text'
import ListItem from '@/primitives/ListItem'

const LinkListItem = ({ to, children, ...props }) => (
    <ListItem
        {...props}
        backgroundColor={{ df: 'white', hover: 'indigo' }}
        backgroundShade={{ df: null, hover: '100' }}
        borderColor="gray"
        borderShade="300"
        borderT={{ first: 1 }}
        borderRadiusT={{ first: 'md' }}
        borderRadiusB={{ last: 'md' }}
        borderB="1"
        borderL="1"
        borderR="1"
    >
        <Link to={to} display="block" spaceX={4} spaceY={3}>
            <Text color="indigo" shade="700" weight="medium">
                {children}
            </Text>
        </Link>
    </ListItem>
)

export default LinkListItem
