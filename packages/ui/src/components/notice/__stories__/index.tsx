import React from 'react'
import { storiesOf } from '@storybook/react'
import { Box, Text } from 'rebass'
import { Notice } from '..'
import { Button } from '../../buttons'

storiesOf('Notice', module)
  .add('Types', () => (
    <Box maxWidth={'420px'}>
      <Notice
        notification={{
          content: 'Default notification',
        }}
        onClose={() => console.log('Close')}
        mb={'md'}
      />
      <Notice
        notification={{
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        }}
        onClose={() => console.log('Close')}
        mb={'md'}
      />
      <Notice notification={{ type: 'info', content: 'Info notification' }} mb={'md'}/>
      <Notice notification={{ type: 'warn', content: 'Warn notification' }} mb={'md'}/>
      <Notice notification={{ type: 'error', content: 'Error notification' }} mb={'md'}/>
      <Notice notification={{ type: 'success', content: 'Success notification' }} mb={'md'}/>
      <Notice notification={{ icon: null }} mb={'md'}>
        <Text mb={'md'}>Some content with elements</Text>
        <Button>Let's go</Button>
      </Notice>
    </Box>
  ))
