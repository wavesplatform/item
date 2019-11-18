import { IDapp } from './dapp'
import { ILot } from './lot'

export interface IItemParams {
  txId?: string
  version?: number
  name: string
  imageUrl: string
  storageImageUrl?: string
  misc?: any
  timestamp?: string | number
}

export interface IItem {
  id?: string
  txId: string
  dapp: IDapp
  name?: string
  quantity?: string | number
  reissuable?: boolean
  timestamp?: string | number
  params: IItemParams
  lots?: ILot[]
}

export interface ISearchItemObject {
  objectID: string
  id: string,
  txId?: string
  name?: string
  quantity?: string | number
  dapp?: IDapp
  params?: IItemParams
}
