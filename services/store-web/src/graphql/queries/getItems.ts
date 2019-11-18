import gql from 'graphql-tag'
import itemInfoFragment from '../fragments/itemInfo'

export const getMoreItemsQuery = gql`
  query MoreItemsQuery($filter: ItemFilter, $cursorInfo: CursorInfo) {
    items(filter: $filter, orderBy: timestamp_DESC, cursorInfo: $cursorInfo) {
      edges {
        cursor
        node {
          ...itemInfo
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
  ${itemInfoFragment}
`
