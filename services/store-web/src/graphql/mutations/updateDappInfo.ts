import gql from 'graphql-tag'
import dappInfoFragment from '../fragments/dappInfo'

export const updateDappInfoMutation = gql`
  mutation UpdateDappInfo($input: DappInfo!) {
    updateDappInfo(input: $input) {
      ...dappInfo
    }
  }
  ${dappInfoFragment}
`
