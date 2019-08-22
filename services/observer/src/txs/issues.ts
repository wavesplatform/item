import { getIssueTxs } from '../api'

/**
 * Get all chunks of txs and then concat them
 * @param address
 * @param timeStart
 * @param timeEnd
 */
export const getIssueTxsForPeriod = async (address: string, timeStart: number, timeEnd?: number): Promise<any[]> => {
  const chunks = getIssueTxs({
    limit: 1,
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
