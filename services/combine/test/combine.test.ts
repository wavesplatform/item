import { dataTx, invokeScriptBuyTx, invokeScriptCancelTx, invokeScriptSellTx, issueTx } from './txs'
import { combineItemOps, combineLotOps, combineParamsOps } from '../src/combine'
import { OPERATION_TYPE } from '@item/types'
import { Data, InvokeScript, Issue } from '../src/__generated__/prisma-client'

const issueMock: Issue = {
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

const dataMock: Data = {
  id: '123',
  txId: 'txId',
  timestamp: '2019-09-02 13:50:50.535',
  sender: 'sender',
  senderPublicKey: 'senderPublicKey',
  data: [{
    key: 'EF21HJKrzxKq8nn1gDWNzYAHX3VzdqAa2LSHjL9i33s5',
    type: 'string',
    value: '{"version":1,"name":"sword","imageUrl":"#","misc":{"power":13}}',
  }],
}

const invokeScriptMock: InvokeScript = {
  id: '123',
  txId: 'txId',
  timestamp: '2019-09-02 13:50:50.535',
  sender: 'sender',
  senderPublicKey: 'senderPublicKey',
  dapp: '3N2MUXXWL1Ws9bCAdrR1xoZWKwBAtyaowFH',
  payment: [],
}

describe('combine', () => {
  describe('combineItemOps', () => {
    it('should be empty', () => {
      const ops = combineItemOps([], [])
      expect(ops.length).toEqual(0)
    })

    it('should be contains delete operation', () => {
      const ops = combineItemOps([issueMock], [])
      expect(ops[0].type).toEqual(OPERATION_TYPE.DELETE)
    })

    it('should be contains create operation', () => {
      const ops = combineItemOps([], [issueTx])
      expect(ops[0].type).toEqual(OPERATION_TYPE.CREATE)
    })
  })

  describe('combineParamsOps', () => {
    it('should be empty', () => {
      const ops = combineParamsOps([], [])
      expect(ops.length).toEqual(0)
    })

    it('should be empty with empty data', () => {
      const ops = combineParamsOps([], [{ ...dataTx, data: [] }])
      expect(ops.length).toEqual(0)
    })

    it('should be contains delete operation', () => {
      const ops = combineParamsOps([dataMock], [])
      expect(ops[0].type).toEqual(OPERATION_TYPE.DELETE)
    })

    it('should be contains two create operation', () => {
      const ops = combineParamsOps([], [dataTx])
      expect(ops[0].type).toEqual(OPERATION_TYPE.CREATE)
      expect(ops.length).toEqual(2)
    })
  })

  describe('combineLotOps', () => {
    it('should be empty', () => {
      const ops = combineLotOps([], [])
      expect(ops.length).toEqual(0)
    })

    it('should be contains delete operation', () => {
      const ops = combineLotOps([invokeScriptMock], [])
      expect(ops[0].type).toEqual(OPERATION_TYPE.DELETE)
    })

    it('should be contains create operation for sell', () => {
      const ops = combineLotOps([], [invokeScriptSellTx])
      expect(ops[0].type).toEqual(OPERATION_TYPE.CREATE)
    })

    it('should be contains update operation for buy', () => {
      const ops = combineLotOps([], [invokeScriptBuyTx])
      expect(ops[0].type).toEqual(OPERATION_TYPE.UPDATE)
    })

    it('should be contains update operation for cancel', () => {
      const ops = combineLotOps([], [invokeScriptCancelTx])
      expect(ops[0].type).toEqual(OPERATION_TYPE.UPDATE)
    })
  })
})