import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from '@hookstate/core'

import useMounted from '~/hooks/useMounted'
import { state as projectsState, fetchProjects } from '~/state/projects'

import Grid from '@/grids/Grid'
import GridColumn from '@/grids/GridColumn'

import GroupedBarChart from '@/charts/GroupedBarChart'
import ListChart from '@/charts/ListChart'

import Stack from '@/primitives/Stack'
import Headline from '@/primitives/Headline'
import Skeleton from '@/primitives/Skeleton'
import LinkButton from '@/primitives/LinkButton'
import StackShelf from '@/primitives/StackShelf'

import Shell from '@/layouts/Shell'

const Project = () => {
    const { id } = useParams()
    const projects = useState(projectsState).items.get()
    const project = projects[id] || {}

    useMounted(() => {
        fetchProjects()
    })

    const barData = [
        {
            name: 'Dec 08, 2020',
            'Page view': 4321,
            'Sign up': 401,
            Download: 297,
        },
        {
            name: 'Dec 09, 2020',
            'Page view': 3412,
            'Sign up': 350,
            Download: 310,
        },
        {
            name: 'Dec 10, 2020',
            'Page view': 3996,
            'Sign up': 397,
            Download: 412,
        },
        {
            name: 'Dec 11, 2020',
            'Page view': 4398,
            'Sign up': 430,
            Download: 478,
        },
        {
            name: 'Dec 12, 2020',
            'Page view': 3777,
            'Sign up': 297,
            Download: 430,
        },
        {
            name: 'Dec 13, 2020',
            'Page view': 3888,
            'Sign up': 393,
            Download: 401,
        },
        {
            name: 'Dec 14, 2020',
            'Page view': 4001,
            'Sign up': 402,
            Download: 415,
        },
    ]

    const eventsData = [
        {
            id: 1,
            label: 'Page view',
            total: 53,
            uniques: 32,
            link: '/events/1',
        },
        {
            id: 2,
            label: 'Sign up',
            total: 41,
            uniques: 29,
            link: '/events/2',
        },
        {
            id: 3,
            label: 'Download',
            total: 35,
            uniques: 12,
        },
    ]

    const devicesData = [
        {
            id: 1,
            label: 'Phone',
            total: 107,
            uniques: 88,
        },
        {
            id: 2,
            label: 'Deskop',
            total: 57,
            uniques: 57,
        },
        {
            id: 3,
            label: 'Tablet',
            total: 11,
            uniques: 4,
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
                    <Headline level={1}>
                        {project.name || <Skeleton width={150} count={1} />}
                    </Headline>

                    <LinkButton to={`/projects/${id}/settings`} size="small">
                        Settings
                    </LinkButton>
                </StackShelf>

                <Grid columns={12} gap={6}>
                    <GridColumn span={12}>
                        <GroupedBarChart height={400} data={barData} />
                    </GridColumn>
                    <GridColumn span={4}>
                        <ListChart headline="Events" data={eventsData} />
                    </GridColumn>
                    <GridColumn span={4}>
                        <ListChart headline="Devices" data={devicesData} />
                    </GridColumn>
                    <GridColumn span={4}>
                        <ListChart headline="Countries" data={countriesData} />
                    </GridColumn>
                </Grid>
            </Stack>
        </Shell>
    )
}

export default Project
