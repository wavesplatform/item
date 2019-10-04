import { ICreateParamsMap, ItemVersions, IUpdateParamsMap, TDataTx, TIssueTx } from '@item/types'
import { TChainId } from '@waves/ts-lib-crypto'
import { txsForItemV1Create, txsForItemV1Update } from './v1'

export const txsForItemCreate = <V extends ItemVersions>(
  params: ICreateParamsMap[V],
  chainId: TChainId,
  senderPublicKey: string,
  seed: string = ''
): [TIssueTx, TDataTx] => {
  switch (params.version) {
    case 1:
      return txsForItemV1Create(params, chainId, senderPublicKey, seed)
    default:
      throw new Error(`Version ${params.version} is not supported`)
  }
}

export const txsForItemUpdate = <V extends ItemVersions>(
  params: IUpdateParamsMap[V],
  chainId: TChainId,
  senderPublicKey: string,
  seed: string = ''
): [TDataTx] => {
  switch (params.version) {
    case 1:
      return txsForItemV1Update(params, chainId, senderPublicKey, seed)
    default:
      throw new Error(`Version ${params.version} is not supported`)
  }
}
