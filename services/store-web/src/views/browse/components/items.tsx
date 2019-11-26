import React from 'react'
import { Box } from 'rebass'
import { getMoreItemsQuery } from '../../../graphql/queries/getItems'
import { MoreItemsQuery, MoreItemsQueryVariables } from '../../../graphql/queries/__generated__/MoreItemsQuery'
import { ItemInclusion } from './inclusions'
import { useQuery } from '@apollo/react-hooks'
import { Button, ItemCard, Loading, NullState } from '@item-protocol/ui'
import { Grid } from '../../../components/layout'
import { Link as RouterLink } from 'react-router-dom'
import { IItem } from '@item-protocol/types'

type TProps = {
  address?: string
  searchString?: string
  inclusions?: ItemInclusion[]
}

type TData = MoreItemsQuery
type TVariables = MoreItemsQueryVariables

export const Items = ({ address, searchString, inclusions }: TProps) => {
  // const [assetId, setAssetId] = useState<string>('')

  // useEffect(() => {
  //   setAssetId('')
  // }, [address, searchString])

  const { data, loading, fetchMore, variables } = useQuery<TData, TVariables>(getMoreItemsQuery, {
    fetchPolicy: 'cache-and-network',
    variables: {
      filter: {
        dappAddress: address,
        searchString,
        inclusions,
      },
      cursorInfo: {
        first: 20,
      },
    },
  })

  const connection = data && data.items
  if (!connection && loading) {
    return <Loading>Loading items...</Loading>
  }

  const items =
    connection &&
    connection.edges &&
    connection.edges.length
      ? connection.edges.map(edge => edge.node)
      : []

  const hasNextPage =
    connection &&
    connection.pageInfo &&
    connection.pageInfo.hasNextPage

  if (!items || !items.length) {
    return <NullState
      heading={'Not items here...'}
      message={'Try to search somewhere else'}
    />
  }

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
        if (!fetchMoreResult || !fetchMoreResult.items) {
          return prev
        }

        const prevItems = prev.items!
        const newEdges = fetchMoreResult.items.edges!
        const pageInfo = fetchMoreResult.items.pageInfo

        return newEdges.length ? {
          ...prev,
          items: {
            ...prevItems,
            pageInfo: { ...prevItems.pageInfo, ...pageInfo },
            edges: [...prevItems.edges!, ...newEdges!],
          },
        } : prev
      },
    })
  }

  const itemGrid = (<Grid sx={{
      gridGap: 'lg',
      gridTemplateColumns: 'repeat(auto-fill, minmax(12rem, 1fr))',
    }}>
      {items.map(item => (
        <RouterLink to={`/item/${item.txId}`} key={item.id}>
          <ItemCard item={item as IItem}/>
        </RouterLink>
      ))}
    </Grid>
  )

  return (
    <Box sx={{ position: 'relative', minHeight: '460px' }}>
      {itemGrid}
      {hasNextPage && <Button
        width={1}
        size={'lg'}
        variant={'secondary'}
        mt={'lg'}
        onClick={loadMore}
        disabled={loading}
        isLoading={loading}
      >
        Load more
      </Button>}
    </Box>
  )
}

export default Items
