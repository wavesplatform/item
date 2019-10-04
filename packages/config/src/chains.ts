export interface IChainConfig {
  node: string
  api: string
  network: string
}

/**
 * Chains:
 * W - Mainnet
 * T - Testnet
 * R - Custom. You can use docker image https://github.com/wavesplatform/private-node-docker-image
 */
export const chains: Record<string, IChainConfig> = {
  W: {
    node: 'https://nodes.wavesnodes.com',
    api: 'https://api.wavesplatform.com/v0/',
    network: 'mainnet',
  },
  T: {
    node: 'https://testnodes.wavesnodes.com',
    api: 'https://api.testnet.wavesplatform.com/v0/',
    network: 'testnet',
  },
  R: {
    node: 'http://localhost:6869',
    api: 'http://localhost:3010',
    network: 'custom',
  },
}
