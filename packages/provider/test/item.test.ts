import { ChaidId } from '@waves/ts-lib-crypto'
import { ItemVersions } from '@item/types'
import { create, update } from '../src'

// Default testnet
const testChainId = process.env.CHAIN_ID || 'T'
const testSeed = process.env.TEST_SEED
const createItemParams = {
  version: 1 as ItemVersions,
  name: 'Sword of Tests',
  assetName: 'SWT01',
  quantity: 100,
  imageUrl: '#',
  misc: {
    damage: 1,
  },
}
const updateItemParams = {
  version: 1 as ItemVersions,
  name: 'New Sword',
  imageUrl: '#',
}

// TODO: need to add more tests with exceptions
// TODO: need to add support on a private node

describe('item', () => {
  beforeAll(async () => {
    if (ChaidId.isTestnet(testChainId)) {
      // Nothing
    } else {
    }
  })

  describe('create', () => {
    it('can create item', async () => {
      const request = create(createItemParams, testChainId)
      const [issueTx, dataTx] = await request.txs(testSeed)
      await request.broadcast(testSeed)

      expect(issueTx).toMatchObject({
        name: createItemParams.assetName,
        quantity: createItemParams.quantity,
      })
    })
  })

  describe('update', () => {
    let assetId

    beforeAll(async () => {
      // Create item
      const request = create(createItemParams, testChainId)
      const [issueTx] = await request.txs(testSeed)
      await request.broadcast(testSeed)

      assetId = issueTx.id
    })

    it('can update item', async () => {
      const request = update({ ...updateItemParams, assetId }, testChainId)
      const [dataTx] = await request.txs(testSeed)
      await request.broadcast(testSeed)

      // TODO: handle data entry to check
    })
  })
})