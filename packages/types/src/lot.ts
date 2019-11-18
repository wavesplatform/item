import { IItem } from './item'
import { IUser } from './user'

export interface ILot {
  id?: string
  txId: string
  item?: IItem
  seller?: IUser
  priceAsset: string
  price: string | number
  total: number
  left: number
  cancelled?: Boolean
}
