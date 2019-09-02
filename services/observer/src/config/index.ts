const oneDayMs = 86400 * 1000

export const config = {
  port: process.env.PORT || 3001,
  network: process.env.NETWORK || 'testnet',
  pollingRepeatEvery: 5000,
  fetchOffsetTxs: oneDayMs,
}

export default config
