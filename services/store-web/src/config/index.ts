import { chains, config as globalConfig } from '@item/config'

export const config = {
  ...globalConfig,
  production: process.env.REACT_APP_NODE_ENV === 'production',
  chainConfig: chains[globalConfig.chainId],
  authData: process.env.REACT_APP_AUTH_DATA || 'item',
  apiEndpoint: process.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql',
  docsUrl: process.env.REACT_APP_DOCS_URL || 'http://localhost:8080',
  exchangeUrl: 'https://coinomat.com/api/v2/indacoin/buy.php',
  explorerUrl: `https://wavesexplorer.com/${globalConfig.chainId === 'T' ? 'testnet/' : ''}`,
}

export default config