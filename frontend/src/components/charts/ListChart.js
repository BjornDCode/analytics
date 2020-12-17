import React from 'react'

import LineChartLine from '@/charts/LineChartLine'

import Card from '@/primitives/Card'
import Text from '@/primitives/Text'

import Grid from '@/grids/Grid'
import GridColumn from '@/grids/GridColumn'

const Label = ({ children }) => (
    <Text color="gray" shade="500" size="sm">
        {children}
    </Text>
)

const ListChart = ({ data, headline }) => {
    const maxValue = Math.max(...data.map(entry => entry.total))
    return (
        <Card>
            <Grid
                Component="header"
                columns={5}
                gap={3}
                spaceX={6}
                spaceY={2}
                borderB="1"
            >
                <GridColumn span={3}>
                    <Label>{headline}</Label>
                </GridColumn>
                <GridColumn display="flex" align="center" justify="end">
                    <Label>Total</Label>
                </GridColumn>
                <GridColumn display="flex" align="center" justify="end">
                    <Label>Uniques</Label>
                </GridColumn>
            </Grid>
            {data.map(entry => (
                <LineChartLine
                    key={entry.id}
                    label={entry.label}
                    total={entry.total}
                    uniques={entry.uniques}
                    link={entry.link}
                    max={maxValue}
                />
            ))}
        </Card>
    )
}

export default ListChart
