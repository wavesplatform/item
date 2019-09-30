export type CollectTxsFunction<Tx> = (addresses: string[], timeStart: number, timeEnd?: number) => Promise<Tx[]>

export type GetTxFunction<Tx> = (addresses: string, timeStart: number, timeEnd?: number) => Promise<Tx[]>

/**
 * Get any txs and concat them
 * @param getTxsFn
 * @param addresses
 * @param timeStart
 * @param timeEnd
 */
export const collectTxs = async <Tx>(
  getTxsFn: GetTxFunction<Tx>,
  addresses: string[],
  timeStart: number,
  timeEnd?: number
): Promise<Tx[]> => {
  return [].concat(...(await Promise.all(addresses.map(address => getTxsFn(address, timeStart, timeEnd)))))
}
