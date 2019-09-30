import memoizee from 'memoizee'
import { ICreateParamsMap, ItemVersions, IUpdateParamsMap, TDataTx, TIntent, TIssueTx } from '@item/types'
import { publicKey, TChainId } from '@waves/ts-lib-crypto'
import { broadcast } from './api'
import { txsForItemCreate, txsForItemUpdate } from './txs-for-item'
import { config as globalConfig } from '@item/config'
import { signWithKeeper } from '@item/utils'

// export type CreateItem<V extends ItemVersions> = () => ITxs<[TIssueTx, TDataTx]> & IBroadcast
// export type UpdateItem<V extends ItemVersions> = () => ITxs<[TDataTx]> & IBroadcast

export const create = <V extends ItemVersions>(
  params: ICreateParamsMap[V],
  chainId: TChainId = globalConfig.chainId
): TIntent<[TIssueTx, TDataTx]> => {
  const txs = memoizee(
    async (seed: string = ''): Promise<[TIssueTx, TDataTx]> => {
      let senderPublicKey = publicKey(seed)

      if (!seed) {
        senderPublicKey = (await WavesKeeper.publicState()).account.publicKey
      }

      const txs = txsForItemCreate(params, chainId, senderPublicKey, seed)

      if (!seed) {
        return (await signWithKeeper(txs)) as [TIssueTx, TDataTx]
      }

      return txs
    }
  )

  return {
    txs,
    broadcast: async (seed?: string): Promise<void> => {
      const [issue, data] = await txs(seed)
      await Promise.all([broadcast(issue), broadcast(data)])
    },
  }
}

export const update = <V extends ItemVersions>(
  params: IUpdateParamsMap[V],
  chainId: TChainId = globalConfig.chainId
): TIntent<[TDataTx]> => {
  const txs = memoizee(
    async (seed: string = ''): Promise<[TDataTx]> => {
      let senderPublicKey = publicKey(seed)

      if (!seed) {
        senderPublicKey = (await WavesKeeper.publicState()).account.publicKey
      }

      const txs = txsForItemUpdate(params, chainId, senderPublicKey, seed)

      if (!seed) {
        return (await signWithKeeper(txs)) as [TDataTx]
      }

      return txs
    }
  )

  return {
    txs,
    broadcast: async (seed?: string): Promise<void> => {
      const [data] = await txs(seed)
      await Promise.all([broadcast(data)])
    },
  }
}