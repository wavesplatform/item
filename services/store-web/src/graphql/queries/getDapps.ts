import gql from 'graphql-tag'
import dappInfoFragment from '../fragments/dappInfo'

export const getGamesQuery = gql`
  query GamesQuery {
    dapps {
      ...dappInfo
    }
  }
  ${dappInfoFragment}
`
