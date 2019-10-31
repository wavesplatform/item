import gql from 'graphql-tag'
import platformStatsFragment from '../fragments/platformStats'

export const getPlatformStatsQuery = gql`
  query PlatformStatsQuery {
    platformStats {
      ...platformStats
    }
  }
  ${platformStatsFragment}
`
