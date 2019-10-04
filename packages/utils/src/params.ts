import { ItemVersions, TCreateParams } from '@item/types'

export const parseParamsPayload = (value: string, version?: ItemVersions): TCreateParams => {
  const json = JSON.parse(value)

  version = version || json.version

  switch (version) {
    case 1:
      const data = { misc: {}, ...json }

      if (!data.name || !data.imageUrl || data.version != version) {
        throw new Error('Invalid payload')
      }

      if (data.name.length > 128) {
        throw new Error('Item name is too long')
      }

      if (Object.values(data.misc).some(x => typeof x === 'object')) {
        throw new Error('No internal objects allowed')
      }

      return { ...data }
    default:
      throw new Error(`Version ${version} is no supported.`)
  }
}
