import React from 'react'
import { getMoreItemsQuery } from '../../../graphql/queries/getItems'
import { MoreItemsQuery, MoreItemsQueryVariables } from '../../../graphql/queries/__generated__/MoreItemsQuery'
import { useQuery } from '@apollo/react-hooks'
import { ItemCard, Loading, NullState } from '@item/ui'
import { Grid } from '../../../components/layout'
import { Link as RouterLink } from 'react-router-dom'
import { IItem } from '@item/types'

type TData = MoreItemsQuery
type TVariables = MoreItemsQueryVariables

export const Items = () => {

  const { data, loading } = useQuery<TData, TVariables>(getMoreItemsQuery, {
    fetchPolicy: 'cache-and-network',
    variables: {
      filter: {
        inclusions: ['sale'],
      },
      cursorInfo: {
        first: 6,
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

  if (!items || !items.length) {
    return <NullState
      heading={'Not items here...'}
      message={'Maybe it hasn\'t been added yet or something\'s broken ;('}
    />
  }

  return (
    <Grid sx={{
      gridGap: 'lg',
      gridTemplateColumns: 'repeat(auto-fill, minmax(12rem, 1fr))',
    }}>
      {items.map(item => (<RouterLink
        to={`/item/${item.txId}`}
        key={item.id}
      >
        <ItemCard item={item as IItem}/>
      </RouterLink>))}
    </Grid>
  )
}

export default Items
