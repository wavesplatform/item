import { IItemVersion } from './versions'

export type TItemMiscV1 = Record<string, number | string | boolean>

export interface ICreateItemParamsV1 extends IItemVersion<1> {
  name: string
  imageUrl: string
  quantity: number
  assetName?: string
  misc?: TItemMiscV1
}

export interface IUpdateItemParamsV1 extends IItemVersion<1> {
  assetId: string
  name: string
  imageUrl: string
  misc?: TItemMiscV1
}