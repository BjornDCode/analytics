import React from 'react'

import { useClasses, propToClasses, propsToClasses } from '~/hooks/useClasses'

const borderPropToClasses = direction => {
    return value => {
        const directionModifier = direction ? `-${direction}` : ''
        const valueModifier = value != 1 ? `-${value}` : ''

        return `border${directionModifier}${valueModifier}`
    }
}

const borderRadiusToClasses = direction => {
    return value => {
        const directionModifier = direction ? `-${direction}` : ''
        const valueModifier = value != 'normal' ? `-${value}` : ''

        return `rounded${directionModifier}${valueModifier}`
    }
}

const borderColorPropsToClasses = (color, shade) => {
    if (!shade) {
        return `border-${color}`
    }

    return `border-${color}-${shade}`
}

const backgroundColorPropsToClasses = (color, shade) => {
    if (!shade) {
        return `bg-${color}`
    }

    return `bg-${color}-${shade}`
}

const Box = ({
    className = '',
    Component = 'div',
    backgroundColor,
    backgroundShade,
    border,
    borderT,
    borderB,
    borderL,
    borderR,
    borderRadius,
    borderRadiusT,
    borderRadiusB,
    borderRadiusL,
    borderRadiusR,
    borderColor,
    borderShade,
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
    width,
    children,
    ...props
}) => {
    const [classes] = useClasses(
        className,
        propsToClasses(
            [backgroundColor, backgroundShade],
            backgroundColorPropsToClasses
        ),
        propToClasses(border, borderPropToClasses()),
        propToClasses(borderT, borderPropToClasses('t')),
        propToClasses(borderB, borderPropToClasses('b')),
        propToClasses(borderL, borderPropToClasses('l')),
        propToClasses(borderR, borderPropToClasses('r')),
        propToClasses(borderRadius, borderRadiusToClasses()),
        propToClasses(borderRadiusT, borderRadiusToClasses('t')),
        propToClasses(borderRadiusB, borderRadiusToClasses('b')),
        propToClasses(borderRadiusL, borderRadiusToClasses('l')),
        propToClasses(borderRadiusR, borderRadiusToClasses('r')),
        propsToClasses([borderColor, borderShade], borderColorPropsToClasses),
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
        propToClasses(spaceB, value => `pb-${value}`),
        propToClasses(width, width => `w-${width}`)
    )

    return (
        <Component className={classes} {...props}>
            {children}
        </Component>
    )
}

export default Box
