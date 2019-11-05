import gql from 'graphql-tag'
import dappInfoFragment from '../fragments/dappInfo'

export const getDappsQuery = gql`
  query DappsQuery {
    dapps {
      ...dappInfo
    }
  }
  ${dappInfoFragment}
`
