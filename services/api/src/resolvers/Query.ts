import { QueryResolvers } from '../__generated__/graphqlgen'
import initIndex from '../helpers/algolia'
import { ItemWhereInput, UserRole } from '../__generated__/prisma-client'
import { SearchableItem } from '../types'
import config from '../config'

const itemsSearchIndex = initIndex('items')
const maxFirstPerRequest = config.maxFirstPerRequest

export const Query: QueryResolvers.Type = {
  ...QueryResolvers.defaultResolvers,

  items: async (parent, { filter, orderBy, cursorInfo: { after, first } = {} }, ctx) => {
    const where: ItemWhereInput = filter
      ? {
          // Dapp filter
          dapp: {
            address: filter.dappAddress,
          },
        }
      : {}

    // Inclusions
    if (filter && filter.inclusions) {
      const forSale = filter.inclusions.includes('sale')
      if (forSale) {
        // where.lots_some = { left_gt: 0 }
      }
    }

    // Search
    if (filter && filter.searchString && itemsSearchIndex) {
      const searchContent = await itemsSearchIndex.search<SearchableItem>({ query: filter.searchString })
      where.id_in = searchContent.hits.map(hit => hit.id)
    }

    const items = await ctx.prisma.itemsConnection({
      where: {
        ...where,
        params_some: {
          id_not: null,
        },
      },
      first: first ? Math.min(first, maxFirstPerRequest) : maxFirstPerRequest,
      after,
      orderBy,
    })

    return items
  },

  item: (parent, { assetId }, ctx) => {
    return ctx.prisma.item({
      txId: assetId,
    })
  },

  dapps: (parent, args, ctx) => {
    return ctx.prisma.users({
      where: {
        role: 'DAPP',
      },
      orderBy: 'createdAt_DESC',
    })
  },

  user: (parent, { address }, ctx) => {
    return ctx.prisma.user({
      address,
    })
  },

  inventory: (parent, args, ctx) => {
    throw new Error('Resolver not implemented')
  },

  lots: (parent, { filter: { seller } = {}, cursorInfo: { after, first } = {} }, ctx) => {
    return ctx.prisma.lotsConnection({
      where: {
        seller: { address: seller },
      },
      first: first ? Math.min(first, maxFirstPerRequest) : maxFirstPerRequest,
      after,
    })
  },

  me: (parent, args, ctx) => {
    const { address } = ctx.me

    return ctx.prisma.user({
      address,
    })
  },

  platformStats: async (parent, args, ctx) => {
    // Dapps
    const dapps = await ctx.prisma
      .usersConnection({ where: { role: 'DAPP' } })
      .aggregate()
      .count()

    // Items
    const items = await ctx.prisma
      .itemsConnection({ where: { dapp: { role: 'DAPP' } } })
      .aggregate()
      .count()

    // Transactions
    const transactions = 0

    return {
      dapps,
      items,
      transactions,
    }
  },
}
