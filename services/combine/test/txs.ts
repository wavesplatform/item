import { DataTransaction, IssueTransaction } from '@waves/waves-rest'
import { DATA_FIELD_TYPE } from '@waves/waves-transactions/dist/transactions'
import { InvokeScriptTransaction } from '@waves/waves-rest/types'

export const issueTx: IssueTransaction = {
  type: 3,
  version: 2,
  decimals: 8,
  reissuable: false,
  fee: 100000000,
  sender: '3N2MUXXWL1Ws9bCAdrR1xoZWKwBAtyaowFH',
  senderPublicKey: '7GGPvAPV3Gmxo4eswmBRLb6bXXEhAovPinfcwVkA2LJh',
  timestamp: 1542539421434,
  chainId: 84,
  proofs: ['TVMCuJAb52AqLZnJHsZoWhjmULk27hzbzy7n3LsrwivdsCQ6gQpn8TtVwYuYhAZVcCLkbm4yznGCgrV96spafcp'],
  id: '3TZ1AWMeVskdy96rNo9AiyegimGyDyXr55MbDTQX4ZXM',
  quantity: 10000,
  name: 'test',
  description: 'tratata',
}

export const dataTx: DataTransaction = {
  type: 12,
  version: 1,
  sender: '3N2MUXXWL1Ws9bCAdrR1xoZWKwBAtyaowFH',
  senderPublicKey: '7GGPvAPV3Gmxo4eswmBRLb6bXXEhAovPinfcwVkA2LJh',
  fee: 100000,
  timestamp: 1542539421605,
  proofs: ['5AMn7DEwZ6VvDLkJNdP5EW1PPJQKeWjy8qp5HoCGWaWWEPYdr1Ewkqor6NfLPDrGQdHd5DFUoE7CtwSrfAUMKLAY'],
  id: 'F7fkrYuJAsJfJRucwty7dcBoMS95xBufxBi7AXqCFgXg',
  data: [
    {
      key: 'EF21HJKrzxKq8nn1gDWNzYAHX3VzdqAa2LSHjL9i33s1',
      type: DATA_FIELD_TYPE.STRING,
      value: '{"version":1,"name":"sword","imageUrl":"#","misc":{"power":13}}',
    },
    {
      key: 'EF21HJKrzxKq8nn1gDWNzYAHX3VzdqAa2LSHjL9i33s2',
      type: DATA_FIELD_TYPE.STRING,
      value: '{"version":1,"name":"sword","imageUrl":"#","misc":{"power":2}}',
    },
  ],
}

export const invokeScriptTx: InvokeScriptTransaction = {
  type: 16,
  version: 2,
  chainId: 84,
  dApp: '3N2MUXXWL1Ws9bCAdrR1xoZWKwBAtyaowFH',
  fee: 100000,
  sender: '3N2MUXXWL1Ws9bCAdrR1xoZWKwBAtyaowFH',
  senderPublicKey: '7GGPvAPV3Gmxo4eswmBRLb6bXXEhAovPinfcwVkA2LJh',
  timestamp: 1542539421523,
  proofs: ['3JYfajBS1KJFSu3cdkF3f3JpH9kGVPR1R1YEgV7LHCHJyQXa82k7SMu9rqwpMvAqCXoQeJa5rEQPF9NY9rnufUan'],
  id: '6X7Fe82PcVeU9qMtscBA2fBzrSf96PtAwrynViR3zRjP',
}

export const invokeScriptSellTx: InvokeScriptTransaction = {
  ...invokeScriptTx,
  call: {
    function: 'sell',
    args: [
      {
        type: 'integer',
        value: 34500000000,
      },
      {
        type: 'binary',
        value: 'base64:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      },
    ],
  },
  payment: [
    {
      assetId: 'F7S8PUW7txDXWtBhN63G4rsZfX7E9885je57XgFKTUc1',
      amount: 1,
    },
  ],
}

export const invokeScriptBuyTx: InvokeScriptTransaction = {
  ...invokeScriptTx,
  call: {
    function: 'buy',
    args: [
      {
        type: 'string',
        value: 'fSvK1SeesQr7ChYm5Au7kkgpgZLeCRLPC3t3Xy366QU',
      },
      {
        type: 'integer',
        value: 1,
      },
    ],
  },
  payment: [
    {
      assetId: 'WAVES',
      amount: 300,
    },
  ],
}

export const invokeScriptCancelTx: InvokeScriptTransaction = {
  ...invokeScriptTx,
  call: {
    function: 'cancel',
    args: [
      {
        type: 'string',
        value: 'fSvK1SeesQr7ChYm5Au7kkgpgZLeCRLPC3t3Xy366QU',
      },
    ],
  },
}
