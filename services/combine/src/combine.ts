import { Issue, ItemCreateInput } from './__generated__/prisma-client'
import { IssueTransaction } from '@waves/waves-rest'
import { Operation } from '@item/types'
import { buildCreateItemOp, buildDeleteItemOp } from './operations'

/**
 * Take array of current issues and array of new issue txs.
 * Compare and return array of item operations (create/delete)
 * @param currentIssues
 * @param newIssueTxs
 */
export const combineItemOps = (
  currentIssues: Issue[],
  newIssueTxs: IssueTransaction[]
): Operation<ItemCreateInput>[] => {
  const ops: Operation<ItemCreateInput>[] = []

  // Convert to maps
  const prev: Record<string, Issue> = currentIssues
    .reduce((prev, current) => ({ ...prev, [current.txId]: current }), {})
  const next: Record<string, IssueTransaction> = newIssueTxs
    .reduce((prev, current) => ({ ...prev, [current.id]: current }), {})

  // Check creating new item
  for (const id of Object.keys(next)) {
    if (!prev[id]) {
      ops.push(buildCreateItemOp(next[id]))
    }
  }

  // Check delete item (ex: blockchain fork)
  for (const id of Object.keys(prev)) {
    if (!next[id]) {
      ops.push(buildDeleteItemOp(id))
    }
  }

  return ops
}