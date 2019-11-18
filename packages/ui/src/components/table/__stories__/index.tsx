import React from 'react'
import { storiesOf } from '@storybook/react'
import { Table, TBody, Td, THead, Tr } from '../index'
import { Box } from 'rebass'

storiesOf('Table', module)
  .add('Default', () => (
    <Box>
      <Table width={1}>
        <THead>
          <Tr>
            <Td width={1 / 3}>Cras justo</Td>
            <Td width={1 / 3}>Morbi leo</Td>
            <Td width={1 / 3}>Dapibus</Td>
          </Tr>
        </THead>
        <TBody>
          <Tr>
            <Td width={1 / 3}>odio</Td>
            <Td width={1 / 3}>facilisis</Td>
            <Td width={1 / 3}>risus</Td>
          </Tr>
          <Tr>
            <Td width={1 / 3}>facilisis</Td>
            <Td width={1 / 3}>risus</Td>
            <Td width={1 / 3}>odio</Td>
          </Tr>
        </TBody>
      </Table>
    </Box>
  ))