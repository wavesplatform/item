import axios from 'axios'
import { axiosHttp, config as wavesApiConfig, wavesApi } from '@waves/waves-rest'
import config from '../config'

const { getIssueTxs, getDataTxs, getInvokeScriptTxs } = wavesApi(wavesApiConfig[config.network], axiosHttp(axios))

export { getIssueTxs, getDataTxs, getInvokeScriptTxs }
