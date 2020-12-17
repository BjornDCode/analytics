import React, { Component, useEffect, useState as useReactState } from 'react'
import { useParams, withRouter } from 'react-router-dom'
import { useState } from '@hookstate/core'
import io from 'socket.io-client'

import useMounted from '~/hooks/useMounted'
import useSocket from '~/hooks/useSocket'
import SocketContext from '~/state/SocketContext'
import { state as projectsState, fetchProjects } from '~/state/projects'
import { fetchEvents } from '~/state/events'

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
    const socket = useSocket()
    const [overview, setOverview] = useReactState([])
    const [events, setEvents] = useReactState([])
    const [countries, setCountries] = useReactState([])
    const [devices, setDevices] = useReactState([])

    useMounted(() => {
        fetchProjects()
        fetchEvents()
    })

    useEffect(() => {
        if (!project.id) {
            return
        }

        socket.emit('project', { id: project.id })
        socket.on('data', data => {
            setOverview(data.overview)
            setEvents(
                data.events.map(type => ({
                    ...type,
                    link: `/events/${type.id}`,
                }))
            )
            setCountries(data.countries)
            setDevices(data.devices)
        })
    }, [project.id])

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
                        <GroupedBarChart height={400} data={overview} />
                    </GridColumn>
                    <GridColumn span={4}>
                        <ListChart headline="Events" data={events} />
                    </GridColumn>
                    <GridColumn span={4}>
                        <ListChart headline="Devices" data={devices} />
                    </GridColumn>
                    <GridColumn span={4}>
                        <ListChart headline="Countries" data={countries} />
                    </GridColumn>
                </Grid>
            </Stack>
        </Shell>
    )
}

export default withRouter(Project)
