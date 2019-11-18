import { LotResolvers } from '../__generated__/graphqlgen'

export const Lot: LotResolvers.Type = {
  ...LotResolvers.defaultResolvers,

  item: ({ txId }, args, ctx) => {
    return ctx.prisma.lot({ txId }).item()
  },
  
  seller: ({ txId }, args, ctx) => {
    return ctx.prisma.lot({ txId }).seller()
  },
}
