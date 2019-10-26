import React from 'react'
import { storiesOf } from '@storybook/react'
import Price from '../price'
import Quantity from '../quantity'

storiesOf('Globals', module)
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