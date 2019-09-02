export enum OPERATION_TYPE {
  CREATE,
  DELETE,
  UPDATE,
}

export type CreateOperation<T = any> = {
  type: OPERATION_TYPE.CREATE
  data: T
}

export type UpdateOperation<T = any> = {
  type: OPERATION_TYPE.UPDATE
  data: T
}

export type DeleteOperation = {
  type: OPERATION_TYPE.DELETE
  id: string
}

export type Operation<C = any, U = any> = CreateOperation<C> | UpdateOperation<U> | DeleteOperation