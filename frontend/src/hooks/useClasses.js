import memoizeOne from 'memoize-one'
import merge from 'classnames'

const defaultFunction = value => value

const responsiveObjectToClasses = (prop, factory = defaultFunction) => {
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

const propToClassesUnmemoized = (prop, factory) => {
    if (!prop) {
        return ''
    }

    if (typeof prop !== 'object') {
        prop = { df: prop }
    }

    return responsiveObjectToClasses(prop, factory)
}

export const propToClasses = memoizeOne(propToClassesUnmemoized)

export const useClasses = (...classes) => {
    return [merge(...classes)]
}
