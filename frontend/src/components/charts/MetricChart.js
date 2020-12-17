import React from 'react'

import Box from '@/primitives/Box'
import Card from '@/primitives/Card'
import Text from '@/primitives/Text'

const MetricChart = ({ value, headline }) => {
    return (
        <Card>
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
        </Card>
    )
}

export default MetricChart
