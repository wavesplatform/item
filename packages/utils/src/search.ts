import { IItem, ISearchItemObject } from '@item-protocol/types'

export const toSearchItemObject = (item: IItem): ISearchItemObject => {
  const { id, txId, name, quantity, params, dapp } = item
  const { timestamp } = params

  return {
    objectID: txId,
    id,
    txId,
    name,
    quantity,
    dapp,
    params: {
      ...params,
      timestamp: new Date(timestamp).getTime(),
    },
  }
}
