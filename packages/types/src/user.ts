import { ILot } from './lot'

export type UserRole = 'USER' | 'DAPP'

export interface UserImages {
  icon: string
}

export interface IUser {
  id?: string
  name?: string
  email?: string
  address: string
  publicKey?: string
  role?: UserRole
  lots?: ILot[]
  image?: UserImages
}
