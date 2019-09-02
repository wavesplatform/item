import { IssueTransaction } from '@waves/waves-rest'
import { IssueCreateInput, ItemCreateInput } from './__generated__/prisma-client'

export const issueTxToIssueInput = (tx: IssueTransaction): IssueCreateInput => {
  const { id, name, decimals, description, quantity, reissuable, timestamp, sender, senderPublicKey } = tx
  return {
    txId: id,
    name,
    description,
    decimals,
    // Handle LONG type
    quantity: (typeof quantity === 'string') ? parseInt(quantity, 10) : quantity,
    reissuable,
    timestamp: new Date(timestamp),
    sender,
    senderPublicKey,
  }
}

export const issueTxToItemInput = (tx: IssueTransaction): ItemCreateInput => {
  const { id, name, quantity, reissuable, timestamp, } = tx
  return {
    txId: id,
    name,
    // Handle LONG type
    quantity: (typeof quantity === 'string') ? parseInt(quantity, 10) : quantity,
    reissuable,
    timestamp: new Date(timestamp),
  }
}