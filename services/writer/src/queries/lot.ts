import { LotCreateInput, LotUpdateInput, prisma } from '../__generated__/prisma-client'

export const getLotByTxId = (txId: string) => {
  return prisma.lot({
    txId,
  })
}

export const upsertLot = (input: LotCreateInput) => {
  return prisma.upsertLot({
    where: {
      txId: input.txId,
    },
    create: input,
    update: input,
  })
}

export const updateLot = (input: LotUpdateInput) => {
  return prisma.updateLot({
    where: {
      txId: input.txId,
    },
    data: input,
  })
}

export const deleteLot = (txId: string) => {
  return prisma.deleteLot({
    txId,
  })
}
