import * as Bull from 'bull'
import { DataTransaction, IssueTransaction } from '@waves/waves-rest'
import { EntityTypes, Operation } from '@item/types'
import { InvokeScriptTransaction } from '@waves/waves-rest/types'

export type Job<JobData = any> = Bull.Job<JobData>
export type Queue<T = any> = Bull.Queue<T>

// Job types

export type TxsJobData<T = any> = {
  txs: T[]
  timeStart: number
  timeEnd?: number
}

export type PreserveMediaJobData = {
  url: string
  entity: EntityTypes
  id: string
}

// Global queues map

export type Queues = {
  pollingQueue?: Queue
  issueTxsQueue?: Queue<TxsJobData<IssueTransaction>>
  dataTxsQueue?: Queue<TxsJobData<DataTransaction>>
  invokeTxsQueue?: Queue<TxsJobData<InvokeScriptTransaction>>
  itemOpsQueue?: Queue<Operation>
  paramsOpsQueue?: Queue<Operation>
  lotOpsQueue?: Queue<Operation>
  preserveMediaQueue?: Queue<PreserveMediaJobData>
}
