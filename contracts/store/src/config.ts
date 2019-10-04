import { chains, config as globalConfig, IChainConfig } from '@item/config'

export const config: IChainConfig = chains[globalConfig.chainId]
