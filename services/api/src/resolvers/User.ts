import { UserResolvers } from '../__generated__/graphqlgen'
import config from '../config'

const maxFirstPerRequest = config.maxFirstPerRequest

export const User: UserResolvers.Type = {
  ...UserResolvers.defaultResolvers,

  items: (parent, args, ctx) => {
    throw new Error('Resolver not implemented')
  },

  lots: ({ address }, { cursorInfo: { after, first } = {} }, ctx) => {
    return ctx.prisma.lotsConnection({
      where: {
        seller: { address },
      },
      first: first ? Math.min(first, maxFirstPerRequest) : maxFirstPerRequest,
      after,
    })
  },

  totalItems: ({ address }, args, ctx) => {
    return ctx.prisma
      .itemsConnection({
        where: {
          dapp: {
            address,
          },
        },
      })
      .aggregate()
      .count()
  },
}
