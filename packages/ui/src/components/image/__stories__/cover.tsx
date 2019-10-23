import React from 'react'
import { storiesOf } from '@storybook/react'
import { Box } from 'rebass'
import { CoverImage } from '../cover'
import emptyImage from '../empty.svg'

storiesOf('Cover', module)
  .addDecorator(story => (<Box sx={{ p: 'lg' }}>{story()}</Box>))
  .add('Default', () => (
    <Box height={'30vh'}>
      <CoverImage src={emptyImage} mb={'md'}/>
      <CoverImage mb={'md'}/>
      <CoverImage editable={true}/>
    </Box>
  ))