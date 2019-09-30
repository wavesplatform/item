import axios from 'axios'
import { axiosHttp, config as wavesApiConfig, wavesApi } from '@waves/waves-rest'
import { config } from './config'

const { broadcast } = wavesApi(wavesApiConfig[config.network], axiosHttp(axios))

export { broadcast }
