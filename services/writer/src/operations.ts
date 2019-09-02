import { Job, queues } from '@item/queues'
import * as Debug from 'debug'
import { Operation, OPERATION_TYPE } from '@item/types'
import { ItemCreateInput } from './__generated__/prisma-client'
import { deleteItem, upsertItem } from './queries/items'

const debug = Debug('writer')

// In
const itemOpsQueue = queues.itemOpsQueue

export const initProcessOperations = () => {
  itemOpsQueue.process(processItemOp)
}

const processItemOp = async (
  { data: op }: Job<Operation<ItemCreateInput>>
) => {
  try {
    switch (op.type) {
      case OPERATION_TYPE.CREATE:
        debug(`➕ Creating item ${op.data.txId}`)
        await upsertItem(op.data)
        break
      case OPERATION_TYPE.DELETE:
        debug(`➖ Deleting item ${op.id}`)
        await deleteItem(op.id)
        break
    }
  } catch (err) {
    debug(err)
    throw err
  }
}