import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from '@hookstate/core'

import projectsState from '~/state/projects'

import Grid from '@/grids/Grid'
import GridColumn from '@/grids/GridColumn'

import Stack from '@/primitives/Stack'
import Headline from '@/primitives/Headline'
import LinkButton from '@/primitives/LinkButton'
import StackShelf from '@/primitives/StackShelf'

import Shell from '@/layouts/Shell'

const Project = () => {
    const { id } = useParams()
    const projects = useState(projectsState)
    const project = projects[id]

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
