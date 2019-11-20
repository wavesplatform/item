import { address, ChaidId } from '@waves/ts-lib-crypto'
import { ItemVersions } from '@item-protocol/types'
import { create, update } from '../src'

const testChainId = process.env.CHAIN_ID

// If you run tests on testnet you must set seed phrase of your account with positive balance
// Otherwise default seed will be used (devnet)
const testSeed = ChaidId.isTestnet(testChainId) ? process.env.TEST_SEED : 'waves private node seed with waves tokens'

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

describe.skip('item', () => {
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
      // await request.broadcast(testSeed)

      assetId = issueTx.id
    })

    it('can update item', async () => {
      const request = update({ ...updateItemParams, assetId }, testChainId)
      const [dataTx] = await request.txs(testSeed)
      // await request.broadcast(testSeed)

      // TODO: handle data entry to check
    })
  })
})
