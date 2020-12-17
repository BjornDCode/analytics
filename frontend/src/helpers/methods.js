export const match = (key, values) => values[key] || values['default']

export const falsy = value => !value

export const distinct = (value, index, self) => self.indexOf(value) === index

export const conditionalProp = (prop, props) => (prop ? props : {})

export const keyById = items =>
    Object.fromEntries(items.map(item => [item.id, item]))
