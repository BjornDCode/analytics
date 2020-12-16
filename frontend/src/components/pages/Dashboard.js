import React from 'react'
import { useState } from '@hookstate/core'

import projectsState from '~/state/projects'

import Simple from '@/layouts/Simple'

import List from '@/primitives/List'
import LinkListItem from '@/lists/LinkListItem'

const Dashboard = () => {
    const projects = Object.values(useState(projectsState).get())

    return (
        <Simple headline="Projects">
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
        </Simple>
    )
}

export default Dashboard
