import gql from 'graphql-tag'
import dappInfoFragment from '../fragments/dappInfo'

export const getDappQuery = gql`
  query DappQuery($address: String!) {
    user(address: $address) {
      ...dappInfo
    }
  }
  ${dappInfoFragment}
`
