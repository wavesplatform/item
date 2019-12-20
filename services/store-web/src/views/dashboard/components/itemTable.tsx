import React from 'react'
import { Table, THead, Tr, Td as BaseTd, TBody, Quantity, Truncate, IconButton } from '@item-protocol/ui'
import { Box, FlexProps, Image, Heading, Link } from 'rebass'
import { Link as RouterLink } from 'react-router-dom'

import { MoreItemsQuery_items_edges_node as ItemsNode } from '../../../graphql/queries/__generated__/MoreItemsQuery'
import { config } from '../../../config'

export const ItemTable = ({ items }: { items: ItemsNode[] }) => {
  return (
    <Box mb='lg'>
      <Table width='100%'>
        <THead>
          <Tr>
            <Td>Item</Td>
            <Td>Quantity</Td>
            <Td>AssetId</Td>
            <Td>Timestamp</Td>
            <Td flex={0} />
          </Tr>
        </THead>
        <TBody>
          {items.map(item => {
            return <ItemTableRow item={item} />
          })}
        </TBody>
      </Table>
    </Box>
  )
}

const ItemTableRow = ({ item }: { item: ItemsNode }) => (
  <Tr>
    <Td alignItems='center'>
      <Image size={24} src={item.params.imageUrl} mr='sm'></Image>
      <Heading as='h3' fontSize='h3' sx={{ fontWeight: 'body' }}>
        {item.params.name}
      </Heading>
    </Td>
    <Td>
      <Quantity value={item.quantity}></Quantity>
    </Td>
    <Td>
      <Link
        maxWidth={300}
        display='block'
        href={`${config.explorerUrl}tx/${item.txId}`}
        target='_blank'
        rel='noreferrer noopener'
        color='grays.3'
        sx={{
          ':hover, :focus': {
            color: 'grays.1',
          },
        }}>
        <Truncate>{item.txId}</Truncate>
      </Link>
    </Td>
    <Td>{item.timestamp}</Td>
    <Td flex={0} justifyContent='flex-end'>
      <RouterLink to={`/dashboard/item/${item.txId}`}>
        <IconButton glyph='mode_edit' variant='secondary' size={'sm'} />
      </RouterLink>
    </Td>
  </Tr>
)

const Td = (props: FlexProps) => (
  <BaseTd
    flex={1}
    sx={{
      p: 'md',
    }}
    {...props}
  />
)
