import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from '@hookstate/core'

import eventsState from '~/state/events'

import Grid from '@/grids/Grid'
import GridColumn from '@/grids/GridColumn'

import StackedBarChart from '@/charts/StackedBarChart'
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

    const barData = [
        {
            name: 'Dec 08, 2020',
            total: 218,
            unique: 152,
        },
        {
            name: 'Dec 09, 2020',
            total: 427,
            unique: 277,
        },
        {
            name: 'Dec 10, 2020',
            total: 312,
            unique: 312,
        },
        {
            name: 'Dec 11, 2020',
            total: 445,
            unique: 295,
        },
        {
            name: 'Dec 12, 2020',
            total: 512,
            unique: 385,
        },
        {
            name: 'Dec 13, 2020',
            total: 0,
            unique: 0,
        },
        {
            name: 'Dec 14, 2020',
            total: 385,
            unique: 300,
        },
    ]

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

                    <LinkButton to={`/events/${id}/settings`} size="small">
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
                        <StackedBarChart height={400} data={barData} />
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
