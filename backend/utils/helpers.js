const xDaysAgo = number => new Date(Date.now() - number * 24 * 60 * 60 * 1000)

const randomDateWithinXDays = daysAgo => {
    const start = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000)
    const end = new Date()
    return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
    )
}

const getSqlFormattedDateString = date =>
    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

const groupBy = (list, keyGetter) => {
    const map = new Map()
    list.forEach(item => {
        const key = keyGetter(item)
        const collection = map.get(key)
        if (!collection) {
            map.set(key, [item])
        } else {
            collection.push(item)
        }
    })
    return Object.fromEntries(map)
}

const uniqueArrayValues = array => [...new Set(array)]

module.exports = {
    xDaysAgo,
    randomDateWithinXDays,
    getSqlFormattedDateString,
    groupBy,
    uniqueArrayValues,
}
