import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from '@hookstate/core'

import projectsState from '~/state/projects'

import Grid from '@/grids/Grid'
import GridColumn from '@/grids/GridColumn'

import BarChart from '@/charts/BarChart'

import Stack from '@/primitives/Stack'
import Headline from '@/primitives/Headline'
import LinkButton from '@/primitives/LinkButton'
import StackShelf from '@/primitives/StackShelf'

import Shell from '@/layouts/Shell'

const Project = () => {
    const { id } = useParams()
    const projects = useState(projectsState)
    const project = projects[id]

    const data = [
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

    return (
        <Shell>
            <Stack spacing={12}>
                <StackShelf justify="between" align="center" spacing={4}>
                    <Headline level={1}>{project.name.get()}</Headline>

                    <LinkButton to={`/projects/${id}/settings`} size="small">
                        Settings
                    </LinkButton>
                </StackShelf>

                <Grid columns={3} gap={6}>
                    <GridColumn span={3}>
                        <BarChart height={400} data={data} />
                    </GridColumn>
                    <GridColumn span={1}>
                        <div
                            className="bg-pink-500"
                            style={{ height: '200px' }}
                        ></div>
                    </GridColumn>
                    <GridColumn span={1}>
                        <div
                            className="bg-pink-500"
                            style={{ height: '200px' }}
                        ></div>
                    </GridColumn>
                    <GridColumn span={1}>
                        <div
                            className="bg-pink-500"
                            style={{ height: '200px' }}
                        ></div>
                    </GridColumn>
                </Grid>
            </Stack>
        </Shell>
    )
}

export default Project
