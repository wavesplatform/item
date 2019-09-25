const dayMs = 86400 * 1000

export const config = {
  port: process.env.PORT || 4001,
  network: process.env.NETWORK || 'testnet',
  pollingRepeatEvery: 5000,
  fetchOffsetTxs: 10 * dayMs,
}

export default config
