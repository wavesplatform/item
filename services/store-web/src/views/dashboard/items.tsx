import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Loading, NullState, Button } from '@item-protocol/ui'
import { Box } from 'rebass'
import { useCurrentUser } from '../../hooks/currentUser'
import { MoreItemsQuery, MoreItemsQueryVariables } from '../../graphql/queries/__generated__/MoreItemsQuery'
import { getMoreItemsQuery } from '../../graphql/queries/getItems'
import { ItemTable } from './components/itemTable'

export const DashboardItems = () => {
  const { loading, loadMore, items, hasNextPage } = useMyDappItems()

  if (!items.length && loading) return <Loading>Loading items...</Loading>
  if (!items.length) return <NullState headers='Items not found' message='You can create one via dashboard' />

  return (
    <Box mb='lg'>
      <ItemTable items={items} />
      {hasNextPage && (
        <Button
          variant='secondary'
          width={1}
          size='lg'
          mt='lg'
          onClick={loadMore}
          disabled={loading}
          isLoading={loading}>
          Load more
        </Button>
      )}
    </Box>
  )
}

const useMyDappItems = () => {
  const { me } = useCurrentUser()

  const { data, loading, fetchMore, variables } = useQuery<MoreItemsQuery, MoreItemsQueryVariables>(getMoreItemsQuery, {
    fetchPolicy: 'cache-and-network',
    variables: {
      filter: {
        dappAddress: me.address,
      },
      cursorInfo: {
        first: 15,
      },
    },
  })

  const connection = data && data.items

  const items = connection && connection.edges ? connection.edges.map(edge => edge.node) : []
  const hasNextPage = !!(connection && connection.pageInfo.hasNextPage)

  const loadMore = () => {
    const { pageInfo } = connection!
    const { cursorInfo } = variables

    fetchMore({
      variables: {
        ...variables,
        cursorInfo: {
          ...cursorInfo,
          after: pageInfo.endCursor,
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!(fetchMoreResult && fetchMoreResult.items)) return prev

        const prevLots = prev.items!
        const newEdges = fetchMoreResult.items.edges!
        const pageInfo = fetchMoreResult.items.pageInfo

        if (!newEdges.length) return prev

        return {
          ...prev,
          lots: {
            ...prevLots,
            pageInfo: { ...prevLots.pageInfo, ...pageInfo },
            edges: [...prevLots.edges!, ...newEdges!],
          },
        }
      },
    })
  }

  return { loading, items, hasNextPage, loadMore }
}
