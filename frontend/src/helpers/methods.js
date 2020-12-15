export const match = (key, values) => values[key] || values['default']

export const defaultFunction = value => value

export const responsiveObjectToClasses = (prop, factory = defaultFunction) => {
    return Object.keys(prop)
        .map(breakpoint => {
            const value = prop[breakpoint]
            // Default breakpoint - Shouldn't have prefix added
            if (breakpoint === 'df') {
                return factory(value)
            }

            return `${breakpoint}:${factory(value)}`
        })
        .join(' ')
}

export const propToClasses = (prop, factory) => {
    if (!prop) {
        return ''
    }

    if (typeof prop !== 'object') {
        prop = { df: prop }
    }

    return responsiveObjectToClasses(prop, factory)
}
