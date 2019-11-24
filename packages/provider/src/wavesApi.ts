import axios from 'axios'
import { axiosHttp, config as wavesApiConfig, IApiConfig, wavesApi } from '@waves/waves-rest'
import { config } from './config'
import { config as globalConfig } from '@item-protocol/config'

// TODO: need to move the config out
const apiConfig: IApiConfig =
  config.network !== 'custom'
    ? wavesApiConfig[config.network]
    : {
      nodes: config.node,
      api: config.api,
      matcher: 'https://matcher.testnet.wavesnodes.com/matcher/',
      matcherPublicKey: '8QUAqtTckM5B8gvcuP7mMswat9SjKUuafJMusEoSn1Gy',
      chainId: globalConfig.chainId,
    }

const { broadcast } = wavesApi(apiConfig, axiosHttp(axios))

export { broadcast }
