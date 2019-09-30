import { Prisma, User } from './__generated__/prisma-client'
import { TokenPayload } from './helpers/auth'

export interface Context {
  prisma: Prisma
  token?: string
  me?: TokenPayload
}

export type PlatformStats = {
  dapps: number
  items: number
  transactions: number
}

export type AuthPayload = {
  token: string
  user: User
}

export interface SearchableItem<T = any> {
  objectID: string
  id: string
  txId?: string
  name?: string
  quantity?: number
  dappId?: string
  timestamp?: number
  misc?: T
}
