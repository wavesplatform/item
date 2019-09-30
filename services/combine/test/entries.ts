import { Data, InvokeScript, Issue } from '../src/__generated__/prisma-client'

export const issueMock: Issue = {
  id: '123',
  txId: 'txId',
  timestamp: '2019-09-02 13:50:50.535',
  sender: 'sender',
  senderPublicKey: 'senderPublicKey',
  name: 'ITEM',
  description: 'description',
  decimals: 0,
  quantity: 100,
  reissuable: false,
}

export const dataMock: Data = {
  id: '123',
  txId: 'txId',
  timestamp: '2019-09-02 13:50:50.535',
  sender: 'sender',
  senderPublicKey: 'senderPublicKey',
  data: [
    {
      key: 'EF21HJKrzxKq8nn1gDWNzYAHX3VzdqAa2LSHjL9i33s5',
      type: 'string',
      value: '{"version":1,"name":"sword","imageUrl":"#","misc":{"power":13}}',
    },
  ],
}

export const invokeScriptMock: InvokeScript = {
  id: '123',
  txId: 'txId',
  timestamp: '2019-09-02 13:50:50.535',
  sender: 'sender',
  senderPublicKey: 'senderPublicKey',
  dapp: '3N2MUXXWL1Ws9bCAdrR1xoZWKwBAtyaowFH',
  payment: [],
}
