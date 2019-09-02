import { config } from './config'
import { queues } from '@item/queues'
import { collectIssueTxs } from './collect'
import * as Debug from 'debug'

const debug = Debug('observer')

// In
const pollingQueue = queues.pollingQueue
const pollingKey = 'polling'

// Out
const issueTxsQueue = queues.issueTxsQueue
const dataTxsQueue = queues.dataTxsQueue

/**
 * Init process polling queue with repeatable job
 */
export const initProcessPolling = () => {
  pollingQueue.process(pollingKey, processPolling)
}

/**
 * Start repeatable job for polling
 */
export const startPolling = async () => {
  // Duplicate job removal
  await pollingQueue.removeRepeatable(pollingKey, {
    every: config.pollingRepeatEvery,
  })

  // Adding new job with repeating every 5* sec
  await pollingQueue.add(pollingKey, {}, {
    repeat: {
      every: config.pollingRepeatEvery,
    },
  })
}

/**
 * Get total completed polls
 */
export const getCompletedCount = async () => {
  return pollingQueue.getCompletedCount()
}

/**
 * Collect and broadcast txs (issues, data, invoke)
 */
const processPolling = async () => {
  try {
    const timeStart = Date.now() - config.fetchOffsetTxs
    const addresses = ['3N2MUXXWL1Ws9bCAdrR1xoZWKwBAtyaowFH']

    // Fetch txs for specified addresses
    const issueTxs = await collectIssueTxs(addresses, timeStart)

    // Broadcast txs to queue for another service
    await issueTxsQueue.add({ txs: issueTxs, timeStart })
  } catch (err) {
    debug(err)
    throw err
  }
}