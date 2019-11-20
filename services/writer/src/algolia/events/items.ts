import initIndex from '../index'
import Debug from 'debug'
import { ISearchItemObject } from '@item-protocol/types'

const debug = Debug('writer')

const searchIndex = initIndex('items')

export const saveItemObject = async (item: ISearchItemObject) => {
  return searchIndex.saveObject(item).then(() => {
    debug(`🔍 Search: saved item ${item.txId}`)
  })
}

export const updateItemObject = async (item: ISearchItemObject) => {
  return searchIndex.partialUpdateObject(item).then(() => {
    debug(`🔍 Search: updated item ${item.txId}`)
  })
}

export const deleteItemObject = async (txId: string) => {
  return searchIndex.deleteObject(txId).then(() => {
    debug(`🔍 Search: deleted item ${txId}`)
  })
}
