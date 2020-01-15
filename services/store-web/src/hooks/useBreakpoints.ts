import { useTheme } from 'emotion-theming'
import { useWindowWidth } from './useWindowWidth'
import { useEffect, useState } from 'react'

export const useBreakpointsStatus = () => {
  const { breakpoints = [] } = useTheme()
  const width = useWindowWidth()
  const [status, setStatus] = useState<Array<boolean>>([])

  useEffect(() => {
    const result = breakpoints.map((bp, index, bps) => {
      const left = emToPx(bps[index - 1] || '0')
      const right = emToPx(bp)
      return between(left, right)(width)
    })

    // handle edge cases
    result[result.length - 1] = between(emToPx(breakpoints[breakpoints.length - 2]), Infinity)(width)

    setStatus(result)
  }, [width, breakpoints])

  return status
}

const emToPx = (ems: string, base = 16) => Number(ems.replace(/r?em/, '')) * base
const between = (left: number, right: number) => (value: number) => value > left && value <= right
