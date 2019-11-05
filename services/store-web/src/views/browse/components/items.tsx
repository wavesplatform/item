import React, { useEffect, useState } from 'react'
import { Sticky, StickyContainer } from 'react-sticky'
import { Box, BoxProps } from 'rebass'
import { getMoreItemsQuery } from '../../../graphql/queries/getItems'
import { MoreItemsQuery, MoreItemsQueryVariables } from '../../../graphql/queries/__generated__/MoreItemsQuery'
import Item from './item'
import { ItemInclusion } from './inclusions'
import { useQuery } from '@apollo/react-hooks'
import { Button, ItemCard, Loading, NullState } from '@item/ui'
import { Grid } from '../../../components/layout'
import { Link as RouterLink } from 'react-router-dom'
import { IItem } from '@item/types'

type TProps = {
  address?: string
  searchString?: string
  inclusions?: ItemInclusion[]
}

type TData = MoreItemsQuery
type TVariables = MoreItemsQueryVariables

export const Items = ({ address, searchString, inclusions }: TProps) => {
  const [assetId, setAssetId] = useState<string>('')

  useEffect(() => {
    setAssetId('')
  }, [address, searchString])

  const { data, loading, fetchMore, variables } = useQuery<TData, TVariables>(getMoreItemsQuery, {
    fetchPolicy: 'cache-and-network',
    variables: {
      filter: {
        dappAddress: address,
        searchString,
        inclusions,
      },
      first: 20,
    },
  })

  const stickyOffset = 52 + 12 // Header height + lg padding

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

  if (assetId) {
    // TODO: hook to force update sticky
    window.dispatchEvent(new Event('scroll'))
  }

  const loadMore = () => {
    const { pageInfo } = connection!

    fetchMore({
      variables: {
        ...variables,
        after: pageInfo.endCursor,
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
            pageInfo: {
              ...prevItems.pageInfo,
              ...pageInfo,
            },
            edges: [
              ...prevItems.edges!,
              ...newEdges!,
            ],
          },
        } : prev
      },
    })
  }

  const itemsGrid = (<Grid sx={{
      gridGap: 'lg',
      gridTemplateColumns: 'repeat(auto-fill, minmax(12rem, 1fr))',
    }}>
      {items.map(item => (<RouterLink
        onClick={ev => {
          ev.stopPropagation()
          ev.preventDefault()
          setAssetId(item.txId)
        }}
        to={`/item/${item.txId}`}
        key={item.id}
      >
        <ItemCard item={item as IItem}/>
      </RouterLink>))}
    </Grid>
  )

  // TODO: need to replace sticky library
  return (
    <Box sx={{ position: 'relative', minHeight: '460px' }}>
      <ItemsSide isConstrained={!!assetId}>
        {itemsGrid}
        {hasNextPage && <Button width={1} size={'lg'} mt={'lg'} onClick={loadMore} disabled={loading}>
          {loading ? 'Loading...' : 'Load more'}
        </Button>}
      </ItemsSide>
      <ItemSide isActive={!!assetId}>
        <StickyContainer style={{ height: '100%' }}>
          {assetId && <Sticky topOffset={-stickyOffset} bottomOffset={0}>
            {({ style, isSticky, distanceFromTop, distanceFromBottom }) => (
              <Box style={distanceFromBottom > stickyOffset ? {
                ...style,
                top: stickyOffset,
              } : (isSticky && {
                ...style,
                position: 'absolute',
                top: 'auto',
                left: 'auto',
                bottom: 0,
              }) || {}}>
                <Item assetId={assetId} onClose={() => setAssetId('')}/>
              </Box>
            )}
          </Sticky>}
        </StickyContainer>
      </ItemSide>
    </Box>
  )
}

const ItemsSide = ({ isConstrained, ...rest }: BoxProps & { isConstrained: boolean }) => {
  const constrained = isConstrained ? {
    width: '50%',
    pr: 0,
  } : {}
  return <Box {...rest} sx={{
    ...constrained,
  }}/>
}

const ItemSide = ({ isActive, ...rest }: BoxProps & { isActive: boolean }) => {
  const shown = isActive ? {
    right: 0,
    opacity: 1,
  } : {}
  return <Box {...rest} sx={{
    position: 'absolute',
    right: '-50%',
    width: '50%',
    top: 0,
    height: '100%',
    opacity: 0,
    pl: 'lg',
    ...shown,
  }}/>
}

export default Items
