import * as Bull from 'bull'
import { ProcessCallbackFunction } from 'bull'
import { Queues } from './types'

const config = {
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
}

const queueNames = {
  pollingQueue: 'POLLING',
  issueTxsQueue: 'ISSUE_TXS',
  dataTxsQueue: 'DATA_TXS',
  invokeTxsQueue: 'INVOKE_TXS',
  itemOpsQueue: 'ITEM_OPS',
  paramsOpsQueue: 'PARAMS_OPS',
  lotOpsQueue: 'LOT_OPS',
  preserveMediaQueue: 'PRESERVE_MEDIA',
}

const createQueue = (name: string) => {
  const queue = new Bull(name, config.redisUrl)
  return queue
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
