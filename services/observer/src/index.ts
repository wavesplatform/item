import Debug from 'debug'
import http from 'http'
import { getCompletedCount, initProcessPolling, startPolling } from './polling'
import { config } from './config'

const debug = Debug('observer')

debug('👀 Observer is starting...')
debug(`🧬 Chain ID: ${config.chainId}`)
debug(`Store: ${config.dappAddresses.store}`)

// Worker
http.createServer(async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ status: 'UP', completed: await getCompletedCount() }))
}).listen(config.port)

const run = async () => {
  initProcessPolling()

  // Restart job
  debug('⌚️ Start polling...')
  // await startPolling()
}

run()
