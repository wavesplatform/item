import { ICreateItemParamsV1, IUpdateItemParamsV1 } from './v1'

export type TCreateParams = ICreateItemParamsV1// | ICreateItemParamsV2
export type TUpdateParams = IUpdateItemParamsV1

export interface ICreateParamsMap {
  1: ICreateItemParamsV1
}

export interface IUpdateParamsMap {
  1: IUpdateItemParamsV1
}