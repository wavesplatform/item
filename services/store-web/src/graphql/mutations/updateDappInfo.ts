import gql from 'graphql-tag'
import dappInfoFragment from '../fragments/dappInfo'

export const updateGameInfoMutation = gql`
  mutation UpdateGameInfo($input: DappInfo!) {
    updateDappInfo(input: $input) {
      ...dappInfo
    }
  }
  ${dappInfoFragment}
`
