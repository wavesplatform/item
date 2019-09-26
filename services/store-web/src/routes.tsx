import React, { Component, ReactNode } from 'react'
import { Box } from 'rebass'
import styled from '@emotion/styled'
import { IDapp, IItem } from '@item/types'
import { ItemCard } from '@item/ui'

export const Body = styled(Box)`
  position: relative;
  overflow-x: hidden;
  min-height: 100%;
  padding-bottom: 6rem;
`

const dapp: IDapp = {
  address: '3N341VEEExcAt9FtSJ7taaUTCgGQpVbGS1Y',
  meta: {
    description: 'The amazing decentralized application',
  },
}

const item: IItem = {
  txId: 'EF21HJKrzxKq8nn1gDWNzYAHX3VzdqAa2LSHjL9i33s5',
  timestamp: '2019-09-02T13:50:50.535Z',
  quantity: 100,
  params: {
    txId: 'EF21HJKrzxKq8nn1gDWNzYAHX3VzdqAa2LSHjL9i33s4',
    imageUrl: '',
    name: 'Sword of magic',
    misc: {},
  },
  dapp: dapp,
}

class Routes extends Component {
  render(): ReactNode {
    return (
      <Body>
        <Box sx={{
          p: 'lg',
          display: 'grid',
          gridGap: 'sm',
          gridTemplateColumns: 'repeat(auto-fill, minmax(12rem, 1fr))',
        }}>
          <ItemCard item={item}/>
        </Box>
      </Body>
    )
  }
}

export default Routes
