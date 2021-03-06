import memoizee from 'memoizee'
import { TIntent, TInvokeScriptTx } from '@item-protocol/types'
import {
  address,
  base58Decode,
  base58Encode,
  base64Decode,
  base64Encode,
  publicKey,
  TChainId,
} from '@waves/ts-lib-crypto'
import { config as globalConfig } from '@item-protocol/config'
import { signWithKeeper } from '@item-protocol/utils'
import { broadcast, getValueByKey } from './api'
import { buy as buyIntent, cancel as cancelIntent, sell as sellIntent } from './store'
import { BigNumber } from '@waves/bignumber'

export const sell = (
  assetId: string,
  amount: number,
  priceAsset: string,
  price: number,
  chainId: TChainId = globalConfig.chainId,
  dApp?: string,
): TIntent<[TInvokeScriptTx]> => {
  const txs = memoizee(
    async (seed: string = ''): Promise<TInvokeScriptTx> => {
      const senderPublicKey = await getSenderPublicKey(seed)

      if (!priceAsset || 'WAVES') priceAsset = globalConfig.originWavesAssetId

      const tx = sellIntent(price, base58Decode(priceAsset)).invoke(seed, {
        payment: [{ amount, assetId }],
        chainId,
        ...(dApp ? { dApp } : {}),
      })

      if (!seed) {
        return ((await signWithKeeper([tx])) as [TInvokeScriptTx])[0]
      }

      return { sender: address({ publicKey: senderPublicKey }, chainId), ...tx }
    },
  )

  return {
    txs,
    broadcast: async (seed?: string): Promise<void> => {
      const tx = await txs(seed)
      await broadcast(tx)
    },
  }
}

export const buy = (
  lotId: string,
  amount: number,
  chainId: TChainId = globalConfig.chainId,
  dApp?: string,
): TIntent<[TInvokeScriptTx]> => {
  const txs = memoizee(
    async (seed: string = ''): Promise<TInvokeScriptTx> => {
      const senderPublicKey = await getSenderPublicKey(seed)

      const { value } = await getValueByKey(globalConfig.dappAddresses.store, lotId)
      const bytes = base64Decode(value.replace('base64:', ''))
      const price = BigNumber.fromBytes(bytes.slice(0, 8)).toNumber()
      const assetId = base58Encode(bytes.slice(8 + 8, 8 + 8 + 32))

      const tx = buyIntent(lotId, amount).invoke(seed, {
        payment: [{ amount: price * amount, assetId: assetId === globalConfig.originWavesAssetId ? null : assetId }],
        chainId,
        ...(dApp ? { dApp } : {}),
      })

      if (!seed) {
        return ((await signWithKeeper([tx])) as [TInvokeScriptTx])[0]
      }

      return { sender: address({ publicKey: senderPublicKey }, chainId), ...tx }
    },
  )

  return {
    txs,
    broadcast: async (seed?: string): Promise<void> => {
      const tx = await txs(seed)
      await broadcast(tx)
    },
  }
}

export const cancel = (
  lotId: string,
  chainId: TChainId = globalConfig.chainId,
  dApp?: string,
): TIntent<[TInvokeScriptTx]> => {
  const txs = memoizee(
    async (seed: string = ''): Promise<TInvokeScriptTx> => {
      const senderPublicKey = await getSenderPublicKey(seed)

      const tx = cancelIntent(lotId).invoke(seed, {
        payment: [],
        chainId,
        ...(dApp ? { dApp } : {}),
      })

      if (!seed) {
        return ((await signWithKeeper([tx])) as [TInvokeScriptTx])[0]
      }

      return { sender: address({ publicKey: senderPublicKey }, chainId), ...tx }
    },
  )

  return {
    txs,
    broadcast: async (seed?: string): Promise<void> => {
      const tx = await txs(seed)
      await broadcast(tx)
    },
  }
}

const getSenderPublicKey = async (seed?: string) => {
  const key = publicKey(seed)
  return seed ? key : (await WavesKeeper.publicState()).account.publicKey
}
