import React from 'react'
import { storiesOf } from '@storybook/react'
import { Flex } from 'rebass'
import { List, ListItem } from '../index'

storiesOf('List', module)
  .add('Default', () => (
    <Flex>
      <List width={1 / 3} mr={'md'}>
        <ListItem>Cras justo odio</ListItem>
        <ListItem isActive={true}>Dapibus ac facilisis in</ListItem>
        <ListItem>Morbi leo risus</ListItem>
      </List>
    </Flex>
  ))