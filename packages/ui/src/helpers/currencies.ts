import { BigNumber } from '@waves/bignumber'

const POWER_8 = '100000000'

export const toWaves = (value: string | number | BigNumber): BigNumber => {
  const res = new BigNumber(value)
  return res.div(POWER_8)
}

export const toSatoshi = (value: string | number | BigNumber): BigNumber => {
  const res = new BigNumber(value)
  return res.mul(POWER_8)
}