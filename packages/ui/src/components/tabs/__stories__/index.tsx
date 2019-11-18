import React from 'react'
import { storiesOf } from '@storybook/react'
import { Box } from 'rebass'
import { TabsItem, TabsList } from '../index'

storiesOf('Tabs', module)
  .add('Default', () => (
    <Box sx={{ border: '1px solid', borderColor: 'grays.7' }}>
      <Box height={'52px'}
           sx={{
             borderBottom: '1px solid',
             borderColor: 'grays.7',
           }}>
        <TabsList height={'100%'}>
          <TabsItem>Cras</TabsItem>
          <TabsItem isActive={true}>Dapibus</TabsItem>
          <TabsItem>Morbi leo risus</TabsItem>
        </TabsList>
      </Box>
      <Box height={'100px'} p={'lg'}>
        Content
      </Box>
    </Box>
  ))