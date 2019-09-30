export interface ITxs<T> {
  txs(seed?: string): Promise<T>
}

export interface IBroadcast {
  broadcast(seed?: string): Promise<void>
}

export type TIntent<Txs> = ITxs<Txs> & IBroadcast