import React from 'react'

import merge from 'classnames'

import { propToClasses } from '~/helpers/methods'

const Box = ({
    className = '',
    Component = 'div',
    display,
    justify,
    space,
    spaceX,
    spaceY,
    spaceL,
    spaceR,
    spaceT,
    spaceB,
    children,
    ...props
}) => {
    const classes = merge(
        className,
        propToClasses(display),
        propToClasses(justify, value => `justify-${value}`),
        propToClasses(space, value => `p-${value}`),
        propToClasses(spaceY, value => `py-${value}`),
        propToClasses(spaceX, value => `px-${value}`),
        propToClasses(spaceL, value => `pl-${value}`),
        propToClasses(spaceR, value => `pr-${value}`),
        propToClasses(spaceT, value => `pt-${value}`),
        propToClasses(spaceB, value => `pb-${value}`)
    )

    return (
        <Component className={classes} {...props}>
            {children}
        </Component>
    )
}

export default Box
