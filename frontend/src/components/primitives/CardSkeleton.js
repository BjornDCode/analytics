import React from 'react'
import BaseSkeleton, { SkeletonTheme } from 'react-loading-skeleton'

import Card from '@/primitives/Card'
import Skeleton from '@/primitives/Skeleton'

const CardSkeleton = ({ width, count = 3 }) => (
    <Card space={6}>
        <Skeleton width={width} count={count} />
    </Card>
)

export default CardSkeleton
