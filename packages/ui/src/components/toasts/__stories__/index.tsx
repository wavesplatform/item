import React from 'react'
import { storiesOf } from '@storybook/react'
import { Toast } from '../index'
import { Box } from 'rebass'

storiesOf('Toast', module)
  .addDecorator(story => (<Box sx={{ p: 'lg' }}>{story()}</Box>))
  .add('Variants', () => (
    <Box>
      <Toast mb={'md'}>Default</Toast>
      <Toast variant={'info'} mb={'md'}>Info</Toast>
      <Toast variant={'warn'} mb={'md'}>Warning</Toast>
      <Toast variant={'danger'} mb={'md'}>Danger</Toast>
      <Toast variant={'success'}>Success</Toast>
    </Box>
  ))