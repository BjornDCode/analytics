import React from 'react'

import Simple from '@/layouts/Simple'

import List from '@/primitives/List'
import LinkListItem from '@/lists/LinkListItem'

const projects = [
    {
        id: 1,
        name: 'useserve.app',
    },
    {
        id: 2,
        name: 'branchci.com',
    },
    {
        id: 3,
        name: 'shopify.com',
    },
]

const Dashboard = () => (
    <Simple headline="Projects">
        <List>
            {projects.map(project => (
                <LinkListItem key={project.id} to={`projects/${project.id}`}>
                    {project.name}
                </LinkListItem>
            ))}
        </List>
    </Simple>
)

export default Dashboard
