import Axios from 'axios'
import { config as wavesApiConfig, wavesApi } from '@waves/waves-rest'
import config from '../config'

const { getIssueTxs, getDataTxs } = wavesApi(wavesApiConfig[config.network], Axios.create())

export { getIssueTxs, getDataTxs }
