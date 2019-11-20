import { Job, queues } from '@item-protocol/queues'
import Debug from 'debug'
import { IItem, Operation, OPERATION_TYPE } from '@item-protocol/types'
import { ItemCreateInput, ItemParamsCreateInput, LotCreateInput } from './__generated__/prisma-client'
import { deleteItem, upsertItem } from './queries/item'
import { deleteManyItemParamses, updateItemParams, upsertItemParams } from './queries/item-params'
import { LotUpdateMutation } from './types'
import { deleteLot, getLotByTxId, updateLot, upsertLot } from './queries/lot'
import { saveItemObject } from './algolia/events/items'
import { toSearchItemObject } from '@item-protocol/utils'

const debug = Debug('writer')

type ItemOperation = Operation<ItemCreateInput>
type ParamsOperation = Operation<ItemParamsCreateInput>

// TODO: Custom update mutation data
// Solution due to lack of increment & decrements
type LotOperation = Operation<LotCreateInput, LotUpdateMutation>

// In
const itemOpsQueue = queues.itemOpsQueue
const paramsOpsQueue = queues.paramsOpsQueue
const lotOpsQueue = queues.lotOpsQueue

// Out
const preserveMediaQueue = queues.preserveMediaQueue

export const initProcessOperations = () => {
  itemOpsQueue.process(processItemOp)
  paramsOpsQueue.process(processParamsOp)
  lotOpsQueue.process(processLotOp)
}

const processItemOp = async ({ data: op }: Job<ItemOperation>) => {
  try {
    switch (op.type) {
      case OPERATION_TYPE.CREATE:
        debug(`➕ Creating item ${op.data.txId}`)
        // We are sure that the creator of the item is already in db,
        // because our observer listens only to dapp from db
        await upsertItem(op.data)
        // item && await saveItemObject(toSearchItemObject(item))
        break
      case OPERATION_TYPE.DELETE:
        debug(`➖ Deleting item ${op.txId}`)
        await deleteItem(op.txId)
        break
    }
  } catch (err) {
    debug(err.message)
    throw err
  }
}

const processParamsOp = async ({ data: op }: Job<ParamsOperation>) => {
  try {
    switch (op.type) {
      case OPERATION_TYPE.CREATE:
        debug(`➕ Creating params ${op.data.paramsId}`)
        const params = await upsertItemParams(op.data)

        const { imageUrl, paramsId, storageImageUrl } = params

        // Preserve media
        // If storage url isn't set
        !storageImageUrl &&
        (await preserveMediaQueue.add({
          url: imageUrl,
          id: paramsId,
          entity: 'items',
        }))

        break
      case OPERATION_TYPE.UPDATE:
        debug(`🔝 Updating params ${op.data.paramsId}`)
        await updateItemParams(op.data)
        break
      case OPERATION_TYPE.DELETE:
        debug(`➖ Deleting many params ${op.txId}`)
        await deleteManyItemParamses(op.txId)
        break
    }
  } catch (err) {
    debug(err.message)
    throw err
  }
}

const processLotOp = async ({ data: op }: Job<LotOperation>) => {
  try {
    switch (op.type) {
      case OPERATION_TYPE.CREATE:
        debug(`➕ Creating lot ${op.data.txId}`)
        // Selling
        await upsertLot(op.data)
        break
      case OPERATION_TYPE.UPDATE:
        const { txId, amount, cancel } = op.data
        debug(`🔝 Updating lot ${txId}`)

        // Cancelling
        if (cancel) {
          await updateLot({ txId, cancelled: true })
          break
        }

        // Buying
        if (amount) {
          const lot = await getLotByTxId(txId)
          const { left } = lot

          await updateLot({ txId, left: Math.max(left - amount, 0) })
        }

        break
      case OPERATION_TYPE.DELETE:
        debug(`➖ Deleting lot ${op.txId}`)
        await deleteLot(op.txId)
        break
    }
  } catch (err) {
    debug(err.message)
    throw err
  }
}
