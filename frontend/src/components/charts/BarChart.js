import React from 'react'
import {
    BarChart as RechartsBarChart,
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
import ChartContainer from '@/charts/ChartContainer'

const BarChart = ({ height, data, headline }) => {
    const bars = Object.keys(data[0])
        .filter(key => key !== 'name')
        .map((key, index) => ({
            key: key,
            color: colors.indigo[`${9 - index}00`],
        }))

    return (
        <ChartContainer height={height} headline={headline}>
            <Box space={6}>
                <ResponsiveContainer width="100%" height={height}>
                    <RechartsBarChart data={data}>
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
                    </RechartsBarChart>
                </ResponsiveContainer>
            </Box>
        </ChartContainer>
    )
}

export default BarChart
