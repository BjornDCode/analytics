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

const StackedBarChart = ({ height, data, headline }) => {
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
                    <BarChart data={data} stackOffset="none">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" xAxisId={0} />
                        <XAxis dataKey="name" xAxisId={1} hide />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {bars.map((bar, index) => (
                            <Bar
                                key={bar.key}
                                dataKey={bar.key}
                                xAxisId={index}
                                fill={bar.color}
                            />
                        ))}
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </Card>
    )
}

export default StackedBarChart
