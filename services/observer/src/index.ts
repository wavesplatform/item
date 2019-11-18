import * as Debug from 'debug'
import * as http from 'http'
import { getCompletedCount, initProcessPolling, startPolling } from './polling'
import { config } from './config'

const debug = Debug('observer')

debug('👀 Observer is starting...')
debug(`🧬 Chain ID: ${config.chainId}`)
debug(`Store: ${config.dappAddresses.store}`)

// Worker
const server = http.createServer(async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ status: 'UP', completed: await getCompletedCount() }))
})

const run = async () => {
  initProcessPolling()

  // Restart job
  debug('⌚️ Start polling...')
  await startPolling()
}

run().then(() => {
  server.listen(config.port, () => {
    debug(`💉 Healthcheck running at ${config.port} port`)
  })
})
