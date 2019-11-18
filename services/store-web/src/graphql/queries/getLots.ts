import gql from 'graphql-tag'
import lotInfoFragment from '../fragments/lotInfo'
import itemInfoFragment from '../fragments/itemInfo'

export const getMoreLotsQuery = gql`
  query MoreLotsQuery($filter: LotFilter, $cursorInfo: CursorInfo) {
    lots(filter: $filter, cursorInfo: $cursorInfo) {
      edges {
        cursor
        node {
          ...lotInfo
          item {
            ...itemInfo
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
  ${lotInfoFragment}
  ${itemInfoFragment}
`
