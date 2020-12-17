import React from 'react'

import { match } from '~/helpers/methods'

import Text from '@/primitives/Text'

const Headline = ({ level = 2, children, ...props }) => {
    const component = `h${level}`
    const size = match(level, {
        1: '3xl',
        2: '2xl',
        3: 'xl',
        4: 'lg',
        5: 'base',
        default: 'base',
    })

    return (
        <Text Component={component} weight="semibold" size={size} {...props}>
            {children}
        </Text>
    )
}

export default Headline
