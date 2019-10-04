import axios from 'axios'
import { axiosHttp, config as wavesApiConfig, wavesApi } from '@waves/waves-rest'
import { config } from './config'

export const { broadcast, getValueByKey } = wavesApi(wavesApiConfig[config.network], axiosHttp(axios))
