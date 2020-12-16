import useBreakpoint from '~/hooks/useBreakpoint'
import { breakpoints } from '~/helpers/constants'

const useUnderBreakpoint = breakpoint => {
    const keys = Object.keys(breakpoints)
    const currentBreakpoint = useBreakpoint()

    const breakpointIndex = keys.findIndex(key => key === breakpoint)
    const currentBreakpointIndex = keys.findIndex(
        key => key === currentBreakpoint
    )

    return breakpointIndex > currentBreakpointIndex
}

export default useUnderBreakpoint
