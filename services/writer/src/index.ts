import Debug from 'debug'
import * as http from 'http'
import { config } from './config'
import { initProcessOperations } from './operations'

const debug = Debug('writer')

console.log(process.env.REDIS_HOST)

debug('📖 Writer is starting...')

// Worker
const server = http.createServer(async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ status: 'UP' }))
})

const run = async () => {
  initProcessOperations()
}

run().then(() => {
  server.listen(config.port, () => {
    debug(`💉 Healthcheck running at ${config.port} port`)
  })
})
