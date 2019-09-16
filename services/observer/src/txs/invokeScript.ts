import { InvokeScriptTransaction } from '@waves/waves-rest/types'
import { getInvokeScriptTxs } from '../api'

/**
 * Get all chunks of txs and then concat them
 * @param address
 * @param timeStart
 * @param timeEnd
 */
export const getInvokeScriptTxsForPeriod = async (
  address: string,
  timeStart: number,
  timeEnd?: number
): Promise<InvokeScriptTransaction[]> => {
  const chunks = getInvokeScriptTxs({
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
