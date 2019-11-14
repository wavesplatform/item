export * from './chains'

export interface IDappAddresses {
  store?: string
}

export interface IConfig {
  /**
   * Chains:
   * W - Mainnet
   * T - Testnet
   * R - Custom. You can use docker image https://github.com/wavesplatform/private-node-docker-image
   * Default: T
   */
  chainId: string

  originWavesAssetId: string
  wavesAssetId: string,
  dappAddresses: IDappAddresses
}

export const config: IConfig = {
  chainId: process.env.CHAIN_ID || 'T',
  originWavesAssetId: process.env.ORIGIN_WAVES_ASSET_ID || '11111111111111111111111111111111',
  wavesAssetId: process.env.WAVES_ASSET_ID || 'WAVES',
  dappAddresses: {
    store: process.env.DAPP_ADDRESS_STORE || '3MrDcz4LFFjPhXdtu7YCqFSnHc3pD1tcWLa',
  },
}

export default config
