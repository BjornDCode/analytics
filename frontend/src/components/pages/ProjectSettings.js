import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from '@hookstate/core'

import useMounted from '~/hooks/useMounted'
import { state as projectsState, fetchProjects } from '~/state/projects'

import Grid from '@/grids/Grid'
import GridColumn from '@/grids/GridColumn'

import Stack from '@/primitives/Stack'
import Headline from '@/primitives/Headline'
import Skeleton from '@/primitives/Skeleton'
import Paragraph from '@/primitives/Paragraph'

import DeleteProjectForm from '@/forms/DeleteProjectForm'
import UpdateProjectSettingsForm from '@/forms/UpdateProjectSettingsForm'

import Shell from '@/layouts/Shell'

const Project = () => {
    const { id } = useParams()
    const state = useState(projectsState)
    const projects = state.items.get()
    const project = projects[id] || {}

    useMounted(() => {
        fetchProjects()
    })

    return (
        <Shell>
            <Stack spacing={12}>
                <Headline level={1}>
                    {project.name ? (
                        `Settings: ${project.name}`
                    ) : (
                        <Skeleton width={150} count={1} />
                    )}
                </Headline>

                <Grid columns={12} gap={6}>
                    <GridColumn span={4}>
                        <Headline level={3}>Project</Headline>
                        <Paragraph>
                            All settings related to this project.
                        </Paragraph>
                    </GridColumn>
                    <GridColumn span={4}>
                        <UpdateProjectSettingsForm
                            state={state}
                            project={project}
                        />
                    </GridColumn>
                </Grid>

                <Grid columns={12} gap={6}>
                    <GridColumn span={4}>
                        <Headline level={3}>Actions</Headline>
                        <Paragraph>
                            All actions you can perform on this project.
                        </Paragraph>
                    </GridColumn>
                    <GridColumn span={4}>
                        <DeleteProjectForm state={state} project={project} />
                    </GridColumn>
                </Grid>
            </Stack>
        </Shell>
    )
}

export default Project
