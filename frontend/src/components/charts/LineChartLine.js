import React from 'react'

import { conditionalProp } from '~/helpers/methods'

import Box from '@/primitives/Box'
import Text from '@/primitives/Text'

import Grid from '@/grids/Grid'
import GridColumn from '@/grids/GridColumn'

import Link from '@/routes/Link'

const Value = ({ children, link }) => {
    const color = link ? 'indigo' : 'gray'
    return (
        <Text position="relative" color={color} shade="700" weight="medium">
            {children}
        </Text>
    )
}

const LineChartLine = ({ name, total, uniques, max, link }) => {
    const overlayWidth = (uniques / max) * 100

    const Component = link ? Link : 'div'

    return (
        <Box position="relative">
            <Grid
                Component={Component}
                {...conditionalProp(link, { to: link })}
                {...conditionalProp(link, {
                    backgroundColor: { df: 'transparent', hover: 'indigo' },
                    backgroundShade: { df: null, hover: '100' },
                })}
                columns={5}
                gap={3}
                spaceX={6}
                spaceY={2}
                justify="between"
                position="relative"
                className="z-10"
            >
                <GridColumn span={3}>
                    <Value link={link}>{name}</Value>
                </GridColumn>
                <GridColumn display="flex" align="center" justify="end">
                    <Value link={link}>{total}</Value>
                </GridColumn>
                <GridColumn display="flex" align="center" justify="end">
                    <Value link={link}>{uniques}</Value>
                </GridColumn>
            </Grid>
            <Box
                position="absolute"
                backgroundColor="indigo"
                backgroundShade="50"
                className="inset-0 z-0"
                style={{ width: `${overlayWidth}%` }}
            />
        </Box>
    )
}

export default LineChartLine
