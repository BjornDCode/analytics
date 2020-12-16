import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from '@hookstate/core'

import eventsState from '~/state/events'

import Grid from '@/grids/Grid'
import GridColumn from '@/grids/GridColumn'

import BarChart from '@/charts/BarChart'
import ListChart from '@/charts/ListChart'
import MetricChart from '@/charts/MetricChart'

import Stack from '@/primitives/Stack'
import Headline from '@/primitives/Headline'
import LinkButton from '@/primitives/LinkButton'
import StackShelf from '@/primitives/StackShelf'

import Shell from '@/layouts/Shell'

const Event = () => {
    const { id } = useParams()
    const events = useState(eventsState)
    const event = events[id]

    const countriesData = [
        {
            id: 1,
            label: 'United States',
            total: 212,
            uniques: 107,
        },
        {
            id: 2,
            label: 'India',
            total: 42,
            uniques: 28,
        },
        {
            id: 3,
            label: 'Brazil',
            total: 11,
            uniques: 11,
        },
        {
            id: 4,
            label: 'United Kingdom',
            total: 8,
            uniques: 8,
        },
        {
            id: 5,
            label: 'Denmark',
            total: 8,
            uniques: 8,
        },
    ]

    return (
        <Shell>
            <Stack spacing={12}>
                <StackShelf justify="between" align="center" spacing={4}>
                    <Headline level={1}>{event.name.get()}</Headline>

                    <LinkButton to={`/event/${id}/settings`} size="small">
                        Settings
                    </LinkButton>
                </StackShelf>

                <Grid columns={12} gap={6}>
                    <GridColumn span={6}>
                        <MetricChart headline="Total" value={57} />
                    </GridColumn>
                    <GridColumn span={6}>
                        <MetricChart headline="Uniques" value={44} />
                    </GridColumn>
                    <GridColumn span={12}>
                        <BarChart height={400} data={countriesData} />
                    </GridColumn>
                    <GridColumn span={6}>
                        <ListChart headline="Value" data={countriesData} />
                    </GridColumn>
                    <GridColumn span={6}>
                        <ListChart headline="Referrer" data={countriesData} />
                    </GridColumn>
                    <GridColumn span={4}>
                        <ListChart headline="Country" data={countriesData} />
                    </GridColumn>
                    <GridColumn span={4}>
                        <ListChart headline="Device" data={countriesData} />
                    </GridColumn>
                    <GridColumn span={4}>
                        <ListChart headline="Browser" data={countriesData} />
                    </GridColumn>
                </Grid>
            </Stack>
        </Shell>
    )
}

export default Event
