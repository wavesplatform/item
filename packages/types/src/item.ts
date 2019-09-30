import { IDapp } from './dapp'

export interface IItemParams {
  txId: string
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
}
