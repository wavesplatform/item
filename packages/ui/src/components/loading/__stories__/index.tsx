import React from 'react'
import { storiesOf } from '@storybook/react'
import { Box } from 'rebass'
import { Loading } from '../index'

storiesOf('Loading', module)
  .add('Default', () => (
    <Box>
      <Loading/>
      <Loading>Some text about loading</Loading>
    </Box>
  ))