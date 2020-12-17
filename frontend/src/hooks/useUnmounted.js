import { useEffect } from 'react'

import useMounted from '~/hooks/useMounted'

const useUnmounted = (callable = () => {}) => {
    useMounted(() => callable)
}

export default useUnmounted
