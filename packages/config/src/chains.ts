export interface IChainConfig {
  nodeUri: string
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
    nodeUri: 'https://nodes.wavesnodes.com',
    network: 'mainnet',
  },
  T: {
    nodeUri: 'https://testnodes.wavesnodes.com',
    network: 'testnet',
  },
  R: {
    nodeUri: 'http://localhost:6869',
    network: 'custom',
  },
}