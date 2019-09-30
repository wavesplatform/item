import algoliasearch, { Index } from 'algoliasearch'
import { config } from '../config'

const client = config.algolia.appId && algoliasearch(config.algolia.appId, config.algolia.apiSecret)

const initIndex = (index: string): Index | undefined => {
  if (!client) {
    return
  }

  return client.initIndex(config.production ? index : 'dev_' + index)
}

export default initIndex
