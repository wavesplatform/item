import { getDataTxs } from '../api'
import { DataTransaction } from '@waves/waves-rest'

/**
 * Get all chunks of data txs and then concat them
 * @param address
 * @param timeStart
 * @param timeEnd
 */
export const getDataTxsForPeriod = async (
  address: string,
  timeStart: number,
  timeEnd?: number
): Promise<DataTransaction[]> => {
  const chunks = getDataTxs({
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
