import gql from 'graphql-tag'
import dappInfoFragment from './dappInfo'
import itemParamsInfoFragment from './itemParamsInfo'

export default gql`
  fragment itemInfo on Item {
    id
    txId
    name
    quantity
    reissuable
    timestamp
    params {
      ...itemParamsInfo
    }
    dapp {
      ...dappInfo
    }
  }
  ${dappInfoFragment}
  ${itemParamsInfoFragment}
`
