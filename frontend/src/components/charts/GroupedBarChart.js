import React from 'react'
import {
    BarChart,
    ResponsiveContainer,
    Legend,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Bar,
} from 'recharts'

import { colors } from '~/helpers/constants'

import Box from '@/primitives/Box'
import Card from '@/primitives/Card'

const GroupedBarChart = ({ height, data = [], headline }) => {
    if (data.length === 0) {
        return null
    }

    const bars = Object.keys(data[0])
        .filter(key => key !== 'name')
        .map((key, index) => ({
            key: key,
            color: colors.indigo[`${9 - index}00`],
        }))

    return (
        <Card height={height} headline={headline}>
            <Box space={6}>
                <ResponsiveContainer width="100%" height={height}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {bars.map(bar => (
                            <Bar
                                key={bar.key}
                                dataKey={bar.key}
                                fill={bar.color}
                            />
                        ))}
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </Card>
    )
}

export default GroupedBarChart
