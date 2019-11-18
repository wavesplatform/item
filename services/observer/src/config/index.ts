import { chains, config as globalConfig } from '@item/config'

const dayMs = 86400 * 1000

export const config = {
  ...globalConfig,
  chainConfig: chains[globalConfig.chainId],
  port: process.env.PORT || 4001,
  pollingRepeatEvery: 5000,
  fetchOffsetTxs: 1 * dayMs,
}

export default config
