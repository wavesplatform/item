import { IUser, UserImages } from './user'

export type DappMetaInfo = {
  description?: string
  url?: string
}

export interface DappImages extends UserImages {
  page?: string
  promo?: string
}

export interface IDapp extends IUser {
  meta?: DappMetaInfo
  totalItems?: number
  image?: DappImages
}
