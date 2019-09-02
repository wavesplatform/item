import { getIssueTxsForPeriod } from './txs/issues'
import { IssueTransaction } from '@waves/waves-rest'

/**
 * Get txs and concat them
 * @param addresses
 * @param timeStart
 * @param timeEnd
 */
export const collectIssueTxs = async (
  addresses: string[],
  timeStart: number,
  timeEnd?: number
): Promise<IssueTransaction[]> => {
  return [].concat(
    ...await Promise.all(
      addresses.map(address => getIssueTxsForPeriod(address, timeStart, timeEnd))
    )
  )
}