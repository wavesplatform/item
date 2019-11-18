import config from '../config'
import { ILot } from '@item/types'
import { BigNumber } from '@waves/bignumber'

export const generateExchangeLink = (address: string, amount: string): string => {
  return `${config.exchangeUrl}?crypto=WAVES&fiat=USD&address=${address}&amount=${amount}`
}

export enum ProfitPriceType {
  Min,
  Max,
}

export const getProfitLot = (lots: ILot[], type: ProfitPriceType): ILot | undefined => {
  if (!lots.length) return

  try {
    return lots.reduce((prevLot: ILot | undefined, lot: ILot) => {
      if (!prevLot) return lot
      return (new BigNumber(lot.price)).lt(prevLot.price) ? lot : prevLot
    }, lots[0])
  } catch (err) {
    return
  }
}