import { Resolvers } from '../__generated__/graphqlgen'
import { Query } from './Query'
import { ItemConnection } from './ItemConnection'
import { PageInfo } from './PageInfo'
import { ItemEdge } from './ItemEdge'
import { Item } from './Item'
import { User } from './User'
import { ItemParams } from './ItemParams'
import { PlatformStats } from './PlatformStats'
import { Mutation } from './Mutation'
import { AuthPayload } from './AuthPayload'
import { LotEdge } from './LotEdge'
import { Lot } from './Lot'
import { LotConnection } from './LotConnection'

export const resolvers: Resolvers = {
  AuthPayload,
  Query,
  Item,
  ItemEdge,
  ItemConnection,
  Lot,
  LotEdge,
  LotConnection,
  PageInfo,
  User,
  ItemParams,
  PlatformStats,
  Mutation,
}
