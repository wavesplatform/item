import memoizee from 'memoizee'
import { TIntent, TInvokeScriptTx } from '@item/types'
import { address, base58Decode, publicKey, TChainId } from '@waves/ts-lib-crypto'
import { config as globalConfig } from '@item/config'
import { signWithKeeper } from '@item/utils'
import { broadcast } from './api'
import { sell as sellIntent } from './store'

export const sell = (
  assetId: string,
  amount: number,
  priceAsset: string,
  price: number,
  chainId: TChainId = globalConfig.chainId
): TIntent<[TInvokeScriptTx]> => {
  const txs = memoizee(
    async (seed: string = ''): Promise<TInvokeScriptTx> => {
      let senderPublicKey = publicKey(seed)
      if (!seed) {
        senderPublicKey = (await WavesKeeper.publicState()).account.publicKey
      }

      if (!priceAsset || 'WAVES') priceAsset = globalConfig.originWavesAssetId

      const tx = sellIntent(price, base58Decode(priceAsset))
        .invoke(seed, {
          payment: [{ amount, assetId }],
          chainId,
        })

      if (!seed) {
        return ((await signWithKeeper([tx])) as [TInvokeScriptTx])[0]
      }

      return { sender: address({ publicKey: senderPublicKey }, chainId), ...tx }
    }
  )

  return {
    txs,
    broadcast: async (seed?: string): Promise<void> => {
      const tx = await txs(seed)
      await broadcast(tx)
    },
  }
}