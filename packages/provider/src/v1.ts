import { ICreateItemParamsV1, IUpdateItemParamsV1, TDataTx, TIssueTx } from '@item-protocol/types'
import { address, TChainId } from '@waves/ts-lib-crypto'
import { data, issue } from '@waves/waves-transactions'
import { parseParamsPayload } from '@item-protocol/utils'

export const txsForItemV1Create = (
  params: ICreateItemParamsV1,
  chainId: TChainId,
  senderPublicKey: string,
  seed: string,
): [TIssueTx, TDataTx] => {
  const { jsonPayload } = createItemV1Payload(params)

  const i = {
    sender: address(seed, chainId),
    ...issue(
      {
        quantity: params.quantity,
        reissuable: false,
        chainId,
        decimals: 0,
        name: params.assetName || 'Item',
        description: '',
        senderPublicKey,
        fee: params.quantity === 1 ? 100000 : undefined,
      },
      seed,
    ),
  }

  const d = {
    sender: address(seed, chainId),
    ...data({ data: [{ key: i.id, value: jsonPayload }], senderPublicKey }, seed),
  }

  return [i, d]
}

export const txsForItemV1Update = (
  params: IUpdateItemParamsV1,
  chainId: TChainId,
  senderPublicKey: string,
  seed: string,
): [TDataTx] => {
  const { jsonPayload } = createItemV1Payload(params)

  const d = {
    sender: address(seed, chainId),
    ...data({ data: [{ key: params.assetId, value: jsonPayload }], senderPublicKey }, seed),
  }

  return [d]
}

const createItemV1Payload = (params: ICreateItemParamsV1 | IUpdateItemParamsV1) => {
  const payload = {
    version: params.version,
    name: params.name,
    imageUrl: params.imageUrl,
    misc: params.misc,
  }

  const jsonPayload = JSON.stringify(payload)

  // Validate params
  parseParamsPayload(jsonPayload, 1)

  return { payload, jsonPayload }
}
