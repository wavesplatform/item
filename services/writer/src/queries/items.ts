import { ItemCreateInput, prisma } from '../__generated__/prisma-client'

export const upsertItem = (item: ItemCreateInput) => {
  return prisma.upsertItem({
    where: {
      txId: item.txId,
    },
    create: item,
    update: item,
  })
}

export const deleteItem = (txId: string) => {
  return prisma.deleteItem({
    txId,
  })
}