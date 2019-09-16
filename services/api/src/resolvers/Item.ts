import { ItemResolvers } from '../__generated__/graphqlgen'

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

  balance: (parent, args, ctx) => {
    throw new Error('Resolver not implemented')
  },
}
