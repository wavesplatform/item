import React from 'react'
import { storiesOf } from '@storybook/react'
import { Flex, Link } from 'rebass'
import { List, ListItem } from '../index'

storiesOf('List', module)
  .add('Default', () => (
    <Flex>
      <List width={1 / 3} mr={'md'}>
        <ListItem>Cras justo odio</ListItem>
        <ListItem isActive={true}>Dapibus ac facilisis in</ListItem>
        <ListItem>Morbi leo risus</ListItem>
      </List>
      <List width={1 / 3} mr={'md'}>
        <ListItem as={Link}>Links</ListItem>
        <ListItem as={Link} isActive={true}>Dapibus ac facilisis in</ListItem>
        <ListItem as={Link}>Morbi leo risus</ListItem>
      </List>
    </Flex>
  ))