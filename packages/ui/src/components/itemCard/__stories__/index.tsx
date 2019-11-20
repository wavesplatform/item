import React from 'react'
import { storiesOf } from '@storybook/react'
import { Box } from 'rebass'
import { IDapp, IItem } from '@item-protocol/types'
import { ItemCard } from '../index'

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

storiesOf('Item Card', module)
  .add('Default', () => (
    <Box sx={{
      display: 'grid',
      gridGap: 'sm',
      gridTemplateColumns: 'repeat(auto-fill, minmax(12rem, 1fr))',
    }}>
      <ItemCard item={item}/>
    </Box>
  ))