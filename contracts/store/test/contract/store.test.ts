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
  })

  it('can buy', async () => {
  })

  it('can cancel', async () => {
  })
})