import Debug from 'debug'
import http from 'http'
import { config } from './config'
import { initProcessMedia } from './preserve'

const debug = Debug('media-preserver')

debug('🏄 Media preserver is starting...')

// Worker
const server = http.createServer(async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ status: 'UP', bucket: config.bucketName }))
})

const run = async () => {
  initProcessMedia()
}

run()
  .then(() => {
    server.listen(config.port, () => {
      debug(`💉 Healthcheck running at ${config.port} port`)
    })
  })
