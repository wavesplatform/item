import React from 'react'
import { storiesOf } from '@storybook/react'
import { Box } from 'rebass'
import Price from '../price'
import Quantity from '../quantity'

storiesOf('Globals', module)
  .addDecorator(story => (<Box sx={{ p: 'lg' }}>{story()}</Box>))
  .add('Price', () => (
    <>
      <Price value={123} mr={'sm'}/><br/>
      <Price value={'987654321'}/>
    </>
  ))
  .add('Quantity', () => (
    <>
      <Quantity value={123} mr={'sm'}/><br/>
      <Quantity value={'987654321'} mr={'sm'}/><br/>
      <Quantity value={1}/>
    </>
  ))