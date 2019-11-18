import { sell } from '../src'

// WIP: tests don't works now, need waves test environment

// Default devnet
const testChainId = process.env.CHAIN_ID || 'R'

const wvs = 10 ** 8

describe('store', async () => {
  before(async () => {
    await setupAccounts({
      store: 1 * wvs,
      seller: 2 * wvs,
      buyer: 10 * wvs,
    })

    const script = compile(file('store.ride'))
    const ssTx = setScript({ script }, accounts.store)

    await broadcast(ssTx)
    await waitForTx(ssTx.id)

    console.log('Contract deployed.')
  })

  it('can sell', async () => {
    const request = sell(null, 1, 'WAVES', 100, testChainId, address(accounts.store))
    const [invokeTx] = await request.txs(accounts.seller)
    await request.broadcast(accounts.seller)

    await waitForTx(invokeTx.id)
  })

  it('can buy', async () => {})

  it('can cancel', async () => {})
})
