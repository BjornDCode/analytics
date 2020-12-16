import { useEffect } from 'react'

const useMounted = (callable = () => {}) => {
    useEffect(callable, [])
}

export default useMounted
