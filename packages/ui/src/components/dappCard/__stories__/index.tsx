import React from 'react'
import { storiesOf } from '@storybook/react'
import { Box } from 'rebass'
import { IDapp } from '@item-protocol/types'
import { DappCard } from '../index'

const dapp: IDapp = {
  address: '3N341VEEExcAt9FtSJ7taaUTCgGQpVbGS1Y',
  name: 'New Dapp',
  meta: {
    description: 'The amazing decentralized application',
  },
  totalItems: 123,
}

storiesOf('Dapp Card', module)
  .add('Default', () => (
    <Box sx={{
      display: 'grid',
      gridGap: 'sm',
      gridTemplateColumns: 'repeat(auto-fill, minmax(12rem, 1fr))',
    }}>
      <DappCard dapp={dapp}/>
    </Box>
  ))
