import config from '../config'

export const generateExchangeLink = (address: string, amount: string): string => {
  return `${config.exchangeUrl}?crypto=WAVES&fiat=USD&address=${address}&amount=${amount}`
}