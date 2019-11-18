import { ItemResolvers } from '../__generated__/graphqlgen'
import config from '../config'

const maxFirstPerRequest = config.maxFirstPerRequest

export const Item: ItemResolvers.Type = {
  ...ItemResolvers.defaultResolvers,

  dapp: ({ txId }, args, ctx) => {
    return ctx.prisma.item({ txId }).dapp()
  },

  params: async ({ txId }, args, ctx) => {
    const params = await ctx.prisma.item({ txId }).params({
      orderBy: 'timestamp_DESC',
      first: 1,
    })

    return params[0]
  },

  lots: ({ txId }, { cursorInfo: { after, first } = {} }, ctx) => {
    return ctx.prisma.lotsConnection({
      where: {
        item: { txId },
        cancelled_not: true,
      },
      first: first ? Math.min(first, maxFirstPerRequest) : maxFirstPerRequest,
      after,
    })
  },
}
