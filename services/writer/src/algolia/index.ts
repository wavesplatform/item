import algoliasearch from 'algoliasearch'
import config from '../config'

const client = algoliasearch(config.algolia.appId, config.algolia.apiSecret)

const initIndex = (index: string) => {
  return client.initIndex(config.algolia.prefix + index)
}

export default initIndex
