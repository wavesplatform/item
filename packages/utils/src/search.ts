import { IItem, ISearchItemObject } from '@item/types'

export const toSearchItemObject = (item: IItem): ISearchItemObject => {
  const { id, txId, name, quantity, params, dapp } = item
  const { timestamp } = params

  return {
    objectID: txId,
    id,
    txId,
    name,
    quantity,
    // See https://www.algolia.com/doc/guides/sending-and-managing-data/prepare-your-data/in-depth/record-specifications/#dates
    dapp,
    params: {
      ...params,
      timestamp: (new Date(timestamp)).getTime(),
    },
  }
}