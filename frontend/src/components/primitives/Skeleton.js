import React from 'react'
import BaseSkeleton, { SkeletonTheme } from 'react-loading-skeleton'

import { colors } from '~/helpers/constants'
import { conditionalProp } from '~/helpers/methods'

const Skeleton = ({ width, count = 3 }) => (
    <SkeletonTheme color={colors.gray[200]} highlightColor={colors.gray[300]}>
        <BaseSkeleton count={count} {...conditionalProp(width, { width })} />
    </SkeletonTheme>
)

export default Skeleton
