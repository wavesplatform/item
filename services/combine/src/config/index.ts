const minuteMs = 60 * 1000

export const config = {
  port: process.env.PORT || 4002,
  paramsBackoff: {
    type: 'exponential',
    delay: 2 * minuteMs,
  },
  lotBackoff: {
    type: 'exponential',
    delay: 2 * minuteMs,
  },
}

export default config
