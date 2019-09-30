import {
  Data,
  InvokeScript,
  Issue,
  ItemCreateInput,
  ItemParamsCreateInput,
  LotCreateInput,
} from './__generated__/prisma-client'
import { DataTransaction, IssueTransaction } from '@waves/waves-rest'
import { Operation, OPERATION_TYPE } from '@item/types'
import {
  buyTxToLotInput,
  cancelTxToLotInput,
  dataEntryToParamsInput,
  issueTxToItemInput,
  sellTxToLotInput,
} from './converter'
import { InvokeScriptTransaction } from '@waves/waves-rest/types'
import { LotUpdateMutation } from './types'

type ItemOperation = Operation<ItemCreateInput>
type ParamsOperation = Operation<ItemParamsCreateInput>

// TODO: Custom update mutation data
// Solution due to lack of increment & decrements
type LotOperation = Operation<LotCreateInput, LotUpdateMutation>

/**
 * Take array of current issues and array of new issue txs.
 * Compare and return array of item operations (create/delete)
 * @param current
 * @param newTxs
 */
export const combineItemOps = (current: Issue[], newTxs: IssueTransaction[]): ItemOperation[] => {
  return combineOps<Issue, IssueTransaction>(current, newTxs, processNewIssueTx)
}

/**
 * Take array of current datas and array of new data txs.
 * Compare and return array of data operations (create/delete)
 * @param current
 * @param newTxs
 */
export const combineParamsOps = (current: Data[], newTxs: DataTransaction[]): ParamsOperation[] => {
  return combineOps<Data, DataTransaction>(current, newTxs, processNewDataTx)
}

/**
 * Take array of current invokes and array of new invoke txs.
 * Compare and return array of lot operations (create/update)
 * @param current
 * @param newTxs
 */
export const combineLotOps = (current: InvokeScript[], newTxs: InvokeScriptTransaction[]): LotOperation[] => {
  return combineOps<InvokeScript, InvokeScriptTransaction>(current, newTxs, processNewInvokeScriptTx)
}

/**
 * Generate new create operation from issue tx (one-to-one)
 * @param tx
 */
const processNewIssueTx = (tx: IssueTransaction): ItemOperation[] => {
  return [{ type: OPERATION_TYPE.CREATE, data: issueTxToItemInput(tx) }]
}

/**
 * Generate new create operations from data entries (one-to-many)
 * @param tx
 */
const processNewDataTx = (tx: DataTransaction): ParamsOperation[] => {
  const ops: ParamsOperation[] = []

  // Add new create operations by entries
  const { id: txId, timestamp, data: entries } = tx
  for (const entry of entries) {
    // Push only valid entries
    try {
      const params = dataEntryToParamsInput(txId, timestamp, entry)
      ops.push({ type: OPERATION_TYPE.CREATE, data: params })
    } catch (err) {
      // Continue
    }
  }

  return ops
}

/**
 * Generate new create or update operations (one-to-one)
 * Depends on witch function has been call
 * @param tx
 */
const processNewInvokeScriptTx = (tx: InvokeScriptTransaction): LotOperation[] => {
  const { call, payment, dApp } = tx

  if (!call || !call.args) {
    return []
  }

  const { function: functionName } = call

  try {
    switch (functionName) {
      case 'sell':
        return [{ type: OPERATION_TYPE.CREATE, data: sellTxToLotInput(tx) }]
      case 'buy':
        return [{ type: OPERATION_TYPE.UPDATE, data: buyTxToLotInput(tx) }]
      case 'cancel':
        return [{ type: OPERATION_TYPE.UPDATE, data: cancelTxToLotInput(tx) }]
    }
  } catch (err) {
    console.log(err)
    // Continue
  }

  return []
}

type ProcessNewTxFunction<Tx = any, O = Operation> = (tx: Tx) => O[]

const combineOps = <Entry = any, Tx = any>(
  current: Entry[],
  newTxs: Tx[],
  processNewTxFn: ProcessNewTxFunction<Tx, Operation>
): Operation[] => {
  const ops: Operation[] = []

  // Convert to maps
  const prev = buildMap<Entry>(current, 'txId')
  const next = buildMap<Tx>(newTxs, 'id')

  // Check creating / updating
  for (const id of Object.keys(next)) {
    if (!prev[id]) {
      // Choose create or update operation
      ops.push(...processNewTxFn(next[id]))
    }
  }

  // Check fork or other tx problem
  for (const id of Object.keys(prev)) {
    if (!next[id]) {
      ops.push({ type: OPERATION_TYPE.DELETE, txId: id })
    }
  }

  return ops
}

const buildMap = <T = any>(arr: T[], key: string = 'id'): Record<string, T> => {
  return arr.reduce((prev, current) => ({ ...prev, [current[key]]: current }), {})
}
