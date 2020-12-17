import React from 'react'
import { useState } from '@hookstate/core'

import useMounted from '~/hooks/useMounted'
import { state as projectsState, fetchProjects } from '~/state/projects'

import Simple from '@/layouts/Simple'

import List from '@/primitives/List'
import Stack from '@/primitives/Stack'
import Shelf from '@/primitives/Shelf'
import LinkButton from '@/primitives/LinkButton'
import CardSkeleton from '@/primitives/CardSkeleton'
import LinkListItem from '@/lists/LinkListItem'

const Dashboard = () => {
    const state = useState(projectsState)
    const projects = Object.values(state.items.get())
    const status = state.status.get()

    useMounted(() => {
        fetchProjects()
    })

    return (
        <Simple headline="Projects">
            {status === 'loading' ? (
                <CardSkeleton />
            ) : (
                <Stack spacing={4}>
                    <List>
                        {projects.map(project => (
                            <LinkListItem
                                key={project.id}
                                to={`projects/${project.id}`}
                            >
                                {project.name}
                            </LinkListItem>
                        ))}
                    </List>
                    <Shelf justify="end">
                        <LinkButton to="/projects/create">New</LinkButton>
                    </Shelf>
                </Stack>
            )}
        </Simple>
    )
}

export default Dashboard
