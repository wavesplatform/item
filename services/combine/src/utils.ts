export const isAssetId = (assetId: string) => {
  return /^[0-9a-fA-f]{42,44}$/i.test(assetId)
}
