import * as Bull from 'bull'
import { ProcessCallbackFunction } from 'bull'
import { Queues } from './types'

const config = {
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
}

const queueNames = {
  // Polling job
  pollingQueue: 'POLLING',

  // Txs
  issueTxsQueue: 'ISSUE_TXS',
  dataTxsQueue: 'DATA_TXS',
  invokeTxsQueue: 'INVOKE_TXS',

  // Operations
  itemOpsQueue: 'ITEM_OPS',
  paramsOpsQueue: 'PARAMS_OPS',
  lotOpsQueue: 'LOT_OPS',

  // Preserve media files on bucket
  preserveMediaQueue: 'PRESERVE_MEDIA',
}

const createQueue = (name: string) => {
  return new Bull(name, config.redisUrl)
}

const processQueue = <T = any>(name: string, cb: ProcessCallbackFunction<T>) => {
  const queue: Bull.Queue<T> = queues[name]
  return queue.process(cb)
}

const queues: Queues = Object.keys(queueNames).reduce((queues, key) => {
  queues[key] = createQueue(queueNames[key])
  return queues
}, {})

export { queueNames, queues, createQueue, processQueue }
