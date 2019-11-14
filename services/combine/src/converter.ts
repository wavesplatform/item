import { DataTransaction, IssueTransaction } from '@waves/waves-rest'
import {
  DataCreateInput,
  IssueCreateInput,
  ItemCreateInput,
  ItemParamsCreateInput,
  LotCreateInput,
} from './__generated__/prisma-client'
import { InvokeScriptTransaction } from '@waves/waves-rest/types'
import { BigNumber } from '@waves/bignumber'
import { base58Encode, base64Decode } from '@waves/ts-lib-crypto'
import { isAssetId } from './utils'
import { LotUpdateMutation } from './types'
import { parseParamsPayload } from '@item/utils'
import { config as globalConfig } from '@item/config'

// Issue Txs

export const issueTxToIssueInput = (tx: IssueTransaction): IssueCreateInput => {
  const { id, name, decimals, description, quantity, reissuable, timestamp, sender, senderPublicKey } = tx
  return {
    txId: id,
    name,
    description,
    decimals,
    // Handle LONG type
    quantity: typeof quantity === 'string' ? parseInt(quantity, 10) : quantity,
    reissuable,
    timestamp: new Date(timestamp),
    sender,
    senderPublicKey,
  }
}

export const issueTxToItemInput = (tx: IssueTransaction): ItemCreateInput => {
  const { id, name, quantity, reissuable, timestamp, sender } = tx
  return {
    txId: id,
    dapp: { connect: { address: sender } },
    name,
    // Handle LONG type
    quantity: typeof quantity === 'string' ? parseInt(quantity, 10) : quantity,
    reissuable,
    timestamp: new Date(timestamp),
  }
}

// Data Txs

export const dataTxToDataInput = (tx: DataTransaction): DataCreateInput => {
  const { id, data, timestamp, sender, senderPublicKey } = tx
  return {
    txId: id,
    data: { set: data },
    timestamp: new Date(timestamp),
    sender,
    senderPublicKey,
  }
}

export type DataEntry = { key: string; value: string | number | boolean }
export const dataEntryToParamsInput = (txId: string, timestamp: number, entry: DataEntry): ItemParamsCreateInput => {
  if (!isAssetId(entry.key)) {
    throw new Error('Key is not asset ID')
  }

  if (typeof entry.value !== 'string') {
    throw new Error('Invalid value')
  }

  const params = parseParamsPayload(entry.value)
  const { version, name, imageUrl, misc } = params

  return {
    // TODO: hash?
    paramsId: [txId, entry.key].join('_'),
    txId,
    item: { connect: { txId: entry.key } },
    version,
    name,
    imageUrl,
    misc,
    timestamp: new Date(timestamp),
  }
}

// InvokeScript Txs

export const sellTxToLotInput = (tx: InvokeScriptTransaction): LotCreateInput => {
  const {
    id: txId,
    call: { args },
    payment,
    sender,
  } = tx

  if (!payment || !payment[0]) {
    throw new Error('Invalid payment')
  }

  const { price, priceAsset } = getSellArgs(args)
  const assetId = payment[0].assetId
  const amount = new BigNumber(payment[0].amount)

  return {
    txId,
    item: { connect: { txId: assetId } },
    // TODO: need check exist seller
    seller: { connect: { address: sender } },
    priceAsset,
    price,
    stock: amount.toNumber(),
  }
}

export const buyTxToLotInput = (tx: InvokeScriptTransaction): LotUpdateMutation => {
  const {
    call: { args },
    payment,
    sender,
  } = tx
  const { lotId, amount } = getBuyArgs(args)

  return {
    txId: lotId,
    amount,
  }
}

export const cancelTxToLotInput = (tx: InvokeScriptTransaction): LotUpdateMutation => {
  const {
    call: { args },
    payment,
    sender,
  } = tx
  const { lotId } = getCancelArgs(args)

  return {
    txId: lotId,
    cancel: true,
  }
}

type CallArg = {
  type: 'binary' | 'integer' | 'boolean' | 'string'
  value: string | number | boolean
}

const getSellArgs = (args: CallArg[]): { price: number; priceAsset: string } => {
  if (args.length !== 2) {
    throw new Error('Invalid args length')
  }

  if (
    args[0].type !== 'integer' ||
    args[1].type !== 'binary' ||
    typeof args[0].value !== 'number' ||
    typeof args[1].value !== 'string'
  ) {
    throw new Error('Invalid args types')
  }

  const price = args[0].value
  const priceAssetBytes = base64Decode(args[1].value.replace('base64:', ''))
  const assetId = base58Encode(priceAssetBytes)
  const priceAsset = assetId === globalConfig.originWavesAssetId ? globalConfig.wavesAssetId : assetId

  return { price, priceAsset }
}

const getBuyArgs = (args: CallArg[]): { lotId: string; amount: number } => {
  if (args.length !== 2) {
    throw new Error('Invalid args length')
  }

  if (
    args[0].type !== 'string' ||
    args[1].type !== 'integer' ||
    typeof args[0].value !== 'string' ||
    typeof args[1].value !== 'number'
  ) {
    throw new Error('Invalid args types')
  }

  const lotId = args[0].value
  const amount = args[1].value

  return { lotId, amount }
}

const getCancelArgs = (args: CallArg[]): { lotId: string } => {
  if (args.length !== 1) {
    throw new Error('Invalid args length')
  }

  if (args[0].type !== 'string' || typeof args[0].value !== 'string') {
    throw new Error('Invalid args types')
  }

  const lotId = args[0].value

  return { lotId }
}
