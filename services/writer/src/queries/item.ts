import { ItemCreateInput, prisma } from '../__generated__/prisma-client'

export const upsertItem = (input: ItemCreateInput) => {
  return prisma.upsertItem({
    where: {
      txId: input.txId,
    },
    create: input,
    update: input,
  })
}

export const deleteItem = (txId: string) => {
  return prisma.deleteItem({
    txId,
  })
}