import React from 'react'
import { useState } from '@hookstate/core'

import { state as eventsState } from '~/state/events'

import Grid from '@/grids/Grid'
import GridColumn from '@/grids/GridColumn'

import Card from '@/primitives/Card'
import Text from '@/primitives/Text'
import Stack from '@/primitives/Stack'
import Headline from '@/primitives/Headline'

const EventTypesList = ({ project }) => {
    const state = useState(eventsState)
    const events = Object.values(state.items.get()).filter(
        event => event.project_id == project.id
    )

    return (
        <Stack spacing={4}>
            <Headline level={3}>Defined events</Headline>

            <Card>
                <Grid
                    Component="header"
                    columns={2}
                    gap={3}
                    spaceX={6}
                    spaceY={2}
                    borderB="1"
                >
                    <GridColumn>
                        <Text color="gray" shade="500" size="sm">
                            Name
                        </Text>
                    </GridColumn>
                    <GridColumn display="flex" align="center" justify="end">
                        <Text color="gray" shade="500" size="sm">
                            Identifier
                        </Text>
                    </GridColumn>
                </Grid>

                {events.map(event => (
                    <Grid
                        key={event.id}
                        Component="header"
                        columns={2}
                        gap={3}
                        spaceX={6}
                        spaceY={2}
                    >
                        <GridColumn>
                            <Text
                                position="relative"
                                color="gray"
                                shade="700"
                                weight="medium"
                                size="sm"
                            >
                                {event.name}
                            </Text>
                        </GridColumn>
                        <GridColumn display="flex" align="center" justify="end">
                            <Text
                                position="relative"
                                color="gray"
                                shade="500"
                                size="sm"
                            >
                                {event.identifier}
                            </Text>
                        </GridColumn>
                    </Grid>
                ))}
            </Card>
        </Stack>
    )
}

export default EventTypesList
