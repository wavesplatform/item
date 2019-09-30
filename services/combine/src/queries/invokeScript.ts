import { DateTimeInput, InvokeScriptCreateInput, prisma } from '../__generated__/prisma-client'

export const getInvokeScriptRange = (dateStart: DateTimeInput, dateEnd?: DateTimeInput) => {
  return prisma.invokeScripts({
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

export const overwriteInvokeScriptRange = async (
  invokeScripts: InvokeScriptCreateInput[],
  dateStart: DateTimeInput,
  dateEnd?: DateTimeInput
) => {
  const nextTxsIds = invokeScripts.map(invokeScript => invokeScript.txId)

  // Delete invokeScripts
  await prisma.deleteManyInvokeScripts({
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

  // Upsert new invokeScripts
  for (const invokeScript of invokeScripts) {
    await upsertInvokeScript(invokeScript)
  }
}

export const upsertInvokeScript = (input: InvokeScriptCreateInput) => {
  return prisma.upsertInvokeScript({
    where: {
      txId: input.txId,
    },
    create: input,
    update: input,
  })
}
