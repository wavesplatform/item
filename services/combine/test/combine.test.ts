import { dataTx, invokeScriptBuyTx, invokeScriptCancelTx, invokeScriptSellTx, issueTx } from './txs'
import { combineItemOps, combineLotOps, combineParamsOps } from '../src/combine'
import { OPERATION_TYPE } from '@item/types'
import { dataMock, invokeScriptMock, issueMock } from './entries'

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
