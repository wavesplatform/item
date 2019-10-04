import { Job, queues, TxsJobData } from '@item/queues'
import { DataTransaction, IssueTransaction } from '@waves/waves-rest'
import { getIssueRange, overwriteIssueRange } from './queries/issue'
import * as Debug from 'debug'
import { combineItemOps, combineLotOps, combineParamsOps } from './combine'
import { dataTxToDataInput, issueTxToIssueInput } from './converter'
import { deleteData, getDataRange, overwriteDataRange } from './queries/data'
import config from './config'
import { Operation, OPERATION_TYPE } from '@item/types'
import { InvokeScriptTransaction } from '@waves/waves-rest/types'
import { getInvokeScriptRange } from './queries/invokeScript'

const debug = Debug('combine')

// In
const issueTxsQueue = queues.issueTxsQueue
const dataTxsQueue = queues.dataTxsQueue
const invokeTxsQueue = queues.invokeTxsQueue

// Out
const itemOpsQueue = queues.itemOpsQueue
const paramsOpsQueue = queues.paramsOpsQueue
const lotOpsQueue = queues.lotOpsQueue

export const initProcessTxs = () => {
  issueTxsQueue.process(processIssueTxs)
  dataTxsQueue.process(processDataTxs)
}

/**
 * If all attempts to save params have failed,
 * we remove the data tx so that it is processed the next time
 */
export const handlingFailedParams = () => {
  paramsOpsQueue.on('global:failed', async (jobId: number) => {
    const { data: op }: Job<Operation> = await paramsOpsQueue.getJob(jobId)

    if (op.type === OPERATION_TYPE.CREATE) {
      const txId = op.data.txId

      debug(`🔙 Remove data ${txId}`)
      await deleteData(txId)
    }
  })
}

const processIssueTxs = async ({ data: { txs, timeStart, timeEnd } }: Job<TxsJobData<IssueTransaction>>) => {
  try {
    const dateStart = new Date(timeStart)
    const dateEnd = timeEnd && new Date(timeEnd)

    // Get latest saved issue txs from DB
    const currentIssues = await getIssueRange(dateStart, dateEnd)

    // Generate operations
    const ops = combineItemOps(currentIssues, txs)

    // Broadcast operations to queue for writer
    for (const op of ops) {
      await itemOpsQueue.add(op)
    }

    // Overwrite prev issues in DB
    const nextIssues = txs.map(tx => issueTxToIssueInput(tx))
    await overwriteIssueRange(nextIssues, dateStart, dateEnd)
  } catch (err) {
    debug(err.message)
    throw err
  }
}

const processDataTxs = async ({ data: { txs, timeStart, timeEnd } }: Job<TxsJobData<DataTransaction>>) => {
  try {
    const dateStart = new Date(timeStart)
    const dateEnd = timeEnd && new Date(timeEnd)

    // Get latest saved data txs from DB
    const current = await getDataRange(dateStart, dateEnd)

    // Generate operations
    const ops = combineParamsOps(current, txs)

    // Broadcast operations to queue for writer
    for (const op of ops) {
      await paramsOpsQueue.add(op, {
        // Retry adding params if happen some error
        attempts: 5,
        backoff: config.paramsBackoff,
      })
    }

    // Overwrite prev issues in DB
    const next = txs.map(tx => dataTxToDataInput(tx))
    await overwriteDataRange(next, dateStart, dateEnd)
  } catch (err) {
    debug(err.message)
    throw err
  }
}

const processInvokeScriptTxs = async ({
  data: { txs, timeStart, timeEnd },
}: Job<TxsJobData<InvokeScriptTransaction>>) => {
  try {
    const dateStart = new Date(timeStart)
    const dateEnd = timeEnd && new Date(timeEnd)

    // Get latest saved invoke txs from DB
    const current = await getInvokeScriptRange(dateStart, dateEnd)

    // Generate operations
    const ops = combineLotOps(current, txs)

    // Broadcast operations to queue for writer
    for (const op of ops) {
      await lotOpsQueue.add(op, {
        // Retry adding lot if happen some error
        attempts: 5,
        backoff: config.lotBackoff,
      })
    }

    // Overwrite prev issues in DB
    // ...
  } catch (err) {
    debug(err.message)
    throw err
  }
}
