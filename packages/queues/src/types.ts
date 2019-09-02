import * as Bull from 'bull'
import { DataTransaction, IssueTransaction } from '@waves/waves-rest'
import { Operation } from '@item/types'

export type Job<JobData = any> = Bull.Job<JobData>

export type TxsJobData<T = any> = {
  txs: T[]
  timeStart: number
  timeEnd?: number
}

export type Queues = {
  pollingQueue?: Bull.Queue
  issueTxsQueue?: Bull.Queue<TxsJobData<IssueTransaction>>
  dataTxsQueue?: Bull.Queue<TxsJobData<DataTransaction>>
  itemOpsQueue?: Bull.Queue<Operation>
}