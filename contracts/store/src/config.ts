import { chains, config as globalConfig, IChainConfig } from '@item-protocol/config'

export const config: IChainConfig = chains[globalConfig.chainId]
