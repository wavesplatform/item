export * from './chains'

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
  dappAddress?: string
}

export const config: IConfig = {
  chainId: process.env.CHAIN_ID || 'T',
  originWavesAssetId: process.env.WAVES_ASSET_ID || '11111111111111111111111111111111',
}

export default config