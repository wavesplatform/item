import { Job, queues, TxsJobData } from '@item/queues'
import { IssueTransaction } from '@waves/waves-rest'
import { getIssueRange, overwriteIssueRange } from './queries/issues'
import * as Debug from 'debug'
import { combineItemOps } from './combine'
import { issueTxToIssueInput } from './utils'

const debug = Debug('combine')

// In
const issueTxsQueue = queues.issueTxsQueue
const dataTxsQueue = queues.dataTxsQueue

// Out
const itemOpsQueue = queues.itemOpsQueue

export const initProcessTxs = () => {
  issueTxsQueue.process(processIssueTxs)
}

const processIssueTxs = async (
  { data: { txs, timeStart, timeEnd } }: Job<TxsJobData<IssueTransaction>>
) => {
  try {
    const dateStart = new Date(timeStart)
    const dateEnd = timeEnd && new Date(timeEnd)

    // Get latest saved issues from DB
    const currentIssues = await getIssueRange(dateStart, dateEnd)

    // Generate operations
    const itemOps = combineItemOps(currentIssues, txs)

    // Broadcast operations to queue for writer
    for (const op of itemOps) {
      await itemOpsQueue.add(op)
    }

    // Overwrite prev issues in DB
    const nextIssues = txs.map(tx => issueTxToIssueInput(tx))
    await overwriteIssueRange(nextIssues, dateStart, dateEnd)
  } catch (err) {
    debug(err)
    throw err
  }
}