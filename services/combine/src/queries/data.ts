import { DataCreateInput, DateTimeInput, prisma } from '../__generated__/prisma-client'

export const getDataRange = (dateStart: DateTimeInput, dateEnd?: DateTimeInput) => {
  return prisma.datas({
    where: {
      AND: [
        {
          timestamp_gt: dateStart,
        },
        {
          timestamp_lt: dateEnd,
        },
      ],
    },
  })
}

export const overwriteDataRange = async (
  datas: DataCreateInput[],
  dateStart: DateTimeInput,
  dateEnd?: DateTimeInput,
) => {
  const nextTxsIds = datas.map(data => data.txId)

  // Delete datas
  await prisma.deleteManyDatas({
    AND: [
      {
        timestamp_gt: dateStart,
      },
      {
        timestamp_lt: dateEnd,
      },
      {
        txId_not_in: nextTxsIds,
      },
    ],
  })

  // Upsert new datas
  for (const data of datas) {
    await upsertData(data)
  }
}

export const upsertData = (input: DataCreateInput) => {
  return prisma.upsertData({
    where: {
      txId: input.txId,
    },
    create: input,
    update: input,
  })
}

export const deleteData = (txId: string) => {
  return prisma.deleteData({
    txId,
  })
}
