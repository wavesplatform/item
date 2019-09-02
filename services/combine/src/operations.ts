import { IssueTransaction } from '@waves/waves-rest'
import { CreateOperation, DeleteOperation, OPERATION_TYPE } from '@item/types'
import { ItemCreateInput } from './__generated__/prisma-client'
import { issueTxToItemInput } from './utils'

export const buildCreateItemOp = (issueTx: IssueTransaction): CreateOperation<ItemCreateInput> => {
  return {
    type: OPERATION_TYPE.CREATE,
    data: issueTxToItemInput(issueTx),
  }
}

export const buildDeleteItemOp = (txId: string): DeleteOperation => {
  return {
    type: OPERATION_TYPE.DELETE,
    id: txId,
  }
}