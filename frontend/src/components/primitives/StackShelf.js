import React from 'react'

import useUnderBreakpoint from '~/hooks/useUnderBreakpoint'

import Stack from '@/primitives/Stack'
import Shelf from '@/primitives/Shelf'

const StackShelf = ({ breakpoint = 'md', children, ...props }) => {
    const under = useUnderBreakpoint(breakpoint)
    const Component = under ? Stack : Shelf

    return <Component {...props}>{children}</Component>
}

export default StackShelf
