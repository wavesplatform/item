import { UserResolvers } from '../__generated__/graphqlgen'

export const User: UserResolvers.Type = {
  ...UserResolvers.defaultResolvers,

  items: (parent, args, ctx) => {
    throw new Error('Resolver not implemented')
  },

  totalItems: ({ address }, args, ctx) => {
    return ctx.prisma.itemsConnection({
      where: {
        dapp: {
          address,
        },
      },
    }).aggregate().count()
  },
}
