const database = require('./database')
const getSqlFormattedDateString = require('./helpers').getSqlFormattedDateString
const groupBy = require('./helpers').groupBy
const uniqueArrayValues = require('./helpers').uniqueArrayValues

const getListChartData = (collection, events, key) => {
    const temp = collection
        .map(type => {
            const eventsForType = events.filter(event => event[key] === type.id)
            return {
                ...type,
                total: eventsForType.length, // Count number of events with the types id
                uniques: uniqueArrayValues(
                    eventsForType.map(event => event.trackee)
                ).length,
            }
        })
        .sort((a, b) => {
            if (a.total > b.total) {
                return -1
            }

            if (a.total < b.total) {
                return 1
            }

            return 0
        })

    return temp
}

const project = async id => {
    const project = await database.getProjectById(id)
    const eventTypes = await database.getEventsByProjectId(id)
    const events = await database.getEventsForLast7Days()
    const countries = uniqueArrayValues(
        events.map(event => event.country)
    ).map(country => ({ id: country, name: country }))
    const devices = uniqueArrayValues(
        events.map(event => event.device)
    ).map(device => ({ id: device, name: device }))

    const eventsGroupedByDates = groupBy(
        events.map(event => ({
            ...event,
            created_at: getSqlFormattedDateString(event.created_at),
        })),
        event => event.created_at
    )

    const overviewData = Object.keys(eventsGroupedByDates).map(date => {
        let keys = {}
        eventTypes.forEach(type => {
            keys[type.name] = eventsGroupedByDates[date].filter(
                event => event.event_type_id === type.id
            ).length
        })
        return {
            name: date,
            ...keys,
        }
    })
    const eventsData = getListChartData(eventTypes, events, 'event_type_id')
    const countriesData = getListChartData(countries, events, 'country')
    const devicesData = getListChartData(devices, events, 'device')

    return {
        overview: overviewData,
        events: eventsData,
        countries: countriesData,
        devices: devicesData,
    }
}

module.exports = {
    project,
}
