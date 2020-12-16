import React from 'react'

import ChartContainer from '@/charts/ChartContainer'

import Box from '@/primitives/Box'
import Text from '@/primitives/Text'

const MetricChart = ({ value, headline }) => {
    return (
        <ChartContainer>
            <Box
                Component="header"
                columns={5}
                gap={3}
                spaceX={6}
                spaceY={2}
                borderB="1"
            >
                <Text color="gray" shade="500" size="sm">
                    {headline}
                </Text>
            </Box>
            <Box display="flex" justify="center" spaceY={8}>
                <Text color="gray" shade="900" size="7xl" weight="bold">
                    {value}
                </Text>
            </Box>
        </ChartContainer>
    )
}

export default MetricChart
