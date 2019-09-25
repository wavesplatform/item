export type UserRole = 'USER' | 'TEST' | 'DAPP'

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
  image?: UserImages
}