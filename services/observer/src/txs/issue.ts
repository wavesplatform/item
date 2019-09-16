import { getIssueTxs } from '../api'
import { IssueTransaction } from '@waves/waves-rest'

/**
 * Get all chunks of txs and then concat them
 * @param address
 * @param timeStart
 * @param timeEnd
 */
export const getIssueTxsForPeriod = async (
  address: string,
  timeStart: number,
  timeEnd?: number
): Promise<IssueTransaction[]> => {
  const chunks = getIssueTxs({
    sender: address,
    timeStart,
    timeEnd,
  })
  const txs = []

  for await (const chunk of chunks) {
    txs.push(...chunk)
  }

  return txs
}
