import React from 'react'
import { storiesOf } from '@storybook/react'
import { Flex } from 'rebass'
import { DropdownItem, DropdownList } from '../list'

storiesOf('Dropdown', module)
  .add('List', () => (
    <Flex>
      <DropdownList width={1 / 3} mr={'md'}>
        <DropdownItem>Cras justo odio</DropdownItem>
        <DropdownItem>Dapibus ac facilisis in</DropdownItem>
        <DropdownItem>Morbi leo risus</DropdownItem>
      </DropdownList>
    </Flex>
  ))