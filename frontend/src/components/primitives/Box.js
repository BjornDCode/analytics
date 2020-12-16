import React from 'react'

import { useClasses, propToClasses } from '~/hooks/useClasses'

const borderPropToClasses = direction => {
    return value => {
        const directionModifier = direction ? `-${direction}` : ''
        const valueModifier = value != 1 ? `-${value}` : ''

        return `border${directionModifier}${valueModifier}`
    }
}

const Box = ({
    className = '',
    Component = 'div',
    border,
    borderX,
    borderY,
    borderT,
    borderB,
    borderL,
    borderR,
    display,
    justify,
    margin,
    marginX,
    marginY,
    marginL,
    marginR,
    marginT,
    marginB,
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
    const [classes] = useClasses(
        className,
        propToClasses(border, borderPropToClasses()),
        propToClasses(borderX, borderPropToClasses('x')),
        propToClasses(borderY, borderPropToClasses('y')),
        propToClasses(borderT, borderPropToClasses('t')),
        propToClasses(borderB, borderPropToClasses('b')),
        propToClasses(borderL, borderPropToClasses('l')),
        propToClasses(borderR, borderPropToClasses('r')),
        propToClasses(display),
        propToClasses(justify, value => `justify-${value}`),
        propToClasses(margin, value => `m-${value}`),
        propToClasses(marginY, value => `my-${value}`),
        propToClasses(marginX, value => `mx-${value}`),
        propToClasses(marginL, value => `ml-${value}`),
        propToClasses(marginR, value => `mr-${value}`),
        propToClasses(marginT, value => `mt-${value}`),
        propToClasses(marginB, value => `mb-${value}`),
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
