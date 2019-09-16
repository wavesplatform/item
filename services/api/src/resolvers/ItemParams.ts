import { ItemParamsResolvers } from '../__generated__/graphqlgen'

export const ItemParams: ItemParamsResolvers.Type = {
  ...ItemParamsResolvers.defaultResolvers,

  item: (parent, args, ctx) => {
    throw new Error('Resolver not implemented')
  },
}
