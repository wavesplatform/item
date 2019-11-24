import * as Debug from 'debug'
import * as http from 'http'
import { handlingFailedParams, initProcessTxs } from './txs'
import config from './config'

const debug = Debug('combine')

debug('🚜 Combine is starting...')

// Worker
http.createServer(async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ status: 'UP' }))
}).listen(config.port)

const run = async () => {
  handlingFailedParams()
  initProcessTxs()
}

run()
