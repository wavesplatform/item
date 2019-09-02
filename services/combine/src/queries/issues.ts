import { DateTimeInput, IssueCreateInput, prisma } from '../__generated__/prisma-client'

export const getIssueRange = (
  dateStart: DateTimeInput,
  dateEnd?: DateTimeInput
) => {
  return prisma.issues({
    where: {
      AND: [{
        timestamp_gt: dateStart,
      }, {
        timestamp_lt: dateEnd,
      }],
    },
  })
}

export const overwriteIssueRange = async (
  issues: IssueCreateInput[],
  dateStart: DateTimeInput,
  dateEnd?: DateTimeInput
) => {
  const nextTxsIds = issues.map(issue => issue.txId)

  // Delete issues
  await prisma.deleteManyIssues({
    AND: [{
      timestamp_gt: dateStart,
    }, {
      timestamp_lt: dateEnd,
    }, {
      txId_not_in: nextTxsIds,
    }],
  })

  // Upsert new issues
  for (const issue of issues) {
    await upsertIssue(issue)
  }
}

export const upsertIssue = (issue: IssueCreateInput) => {
  return prisma.upsertIssue({
    where: {
      txId: issue.txId,
    },
    create: issue,
    update: issue,
  })
}