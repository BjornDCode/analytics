import memoizeOne from 'memoize-one'
import merge from 'classnames'

import { falsy, distinct } from '~/helpers/methods'

const defaultFunction = value => value

const statesObjectToClasses = (prop, factory = defaultFunction) => {
    return Object.keys(prop)
        .map(state => {
            const value = prop[state]
            // Default state - Shouldn't have prefix added
            if (state === 'df') {
                return factory(value)
            }

            return `${state}:${factory(value)}`
        })
        .join(' ')
}

const statesObjectsToClasses = (props, factory = defaultFunction) => {
    // Find all states in all prop objects
    const keys = props
        .map(prop => Object.keys(prop))
        .flat()
        .filter(distinct)

    return keys
        .map(state => {
            const values = props
                .map(prop => prop[state])
                .map((prop, index) => {
                    if (prop) {
                        return prop
                    }

                    // If the prop doesn't have a value for the state - return the default value
                    return props[index]['df']
                })

            // Default state - Shouldn't have prefix added
            if (state === 'df') {
                return factory(...values)
            }

            return `${state}:${factory(...values)}`
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

    return statesObjectToClasses(prop, factory)
}

const propsToClassesUnmemoized = (props = [], factory) => {
    if (props.every(falsy)) {
        return ''
    }

    props = props.map(prop => {
        if (typeof prop === 'object') {
            return prop
        }

        return { df: prop }
    })

    return statesObjectsToClasses(props, factory)
}

export const propToClasses = memoizeOne(propToClassesUnmemoized)
export const propsToClasses = memoizeOne(propsToClassesUnmemoized)

export const useClasses = (...classes) => {
    return merge(...classes)
}
