import React from 'react'
import { storiesOf } from '@storybook/react'
import { Box } from 'rebass'
import { IDapp } from '@item/types'
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
  .addDecorator(story => (<Box sx={{ p: 'lg' }}>{story()}</Box>))
  .add('Default', () => (
    <Box sx={{
      display: 'grid',
      gridGap: 'sm',
      gridTemplateColumns: 'repeat(auto-fill, minmax(12rem, 1fr))',
    }}>
      <DappCard dapp={dapp}/>
    </Box>
  ))
