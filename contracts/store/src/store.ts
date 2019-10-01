import { ByteVector, contract } from '@waves/ts-contract'
import { config as globalConfig } from '@item/config'

export interface StoreContract {
  sell: (price: number, priceAsset: ByteVector) => any
  cancel: (lotId: string) => any
  buy: (lotId: string, amountToBuy: number) => any
}

export const { sell, cancel, buy } = contract<StoreContract>()(globalConfig.dappAddresses.store)
