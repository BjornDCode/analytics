import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from '@hookstate/core'

import projectsState from '~/state/projects'

import Shelf from '@/primitives/Shelf'
import StackShelf from '@/primitives/StackShelf'
import LinkButton from '@/primitives/LinkButton'
import Headline from '@/primitives/Headline'

import Shell from '@/layouts/Shell'

const Project = () => {
    const { id } = useParams()
    const projects = useState(projectsState)
    const project = projects[id]

    return (
        <Shell>
            <StackShelf justify="between" align="center" spacing={4}>
                <Headline level={1}>{project.name.get()}</Headline>

                <LinkButton to={`/projects/${id}/settings`} size="small">
                    Settings
                </LinkButton>
            </StackShelf>
        </Shell>
    )
}

export default Project
