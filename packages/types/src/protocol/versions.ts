export type ItemVersions = 1

export interface IItemVersion<V extends ItemVersions> {
  version: V
}