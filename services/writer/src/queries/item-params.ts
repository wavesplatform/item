import { ItemParamsCreateInput, ItemParamsUpdateInput, prisma } from '../__generated__/prisma-client'

export const upsertItemParams = (input: ItemParamsCreateInput) => {
  return prisma.upsertItemParams({
    where: {
      paramsId: input.paramsId,
    },
    create: input,
    update: input,
  })
}

export const updateItemParams = (input: ItemParamsUpdateInput) => {
  return prisma.updateItemParams({
    where: {
      paramsId: input.paramsId,
    },
    data: input,
  })
}

export const deleteManyItemParamses = (txId: string) => {
  return prisma.deleteManyItemParamses({
    txId,
  })
}
