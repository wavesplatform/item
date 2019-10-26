import React from 'react'
import { storiesOf } from '@storybook/react'
import { Box, Text } from 'rebass'
import { Icon } from '../index'
import { Button } from '../../buttons'

storiesOf('Icon', module)
  .add('Default', () => (
    <>
      {['md', 'xl'].map(size => (
        <Box sx={{ lineHeight: 0 }} mb={'md'} fontSize={size}>
          <Icon glyph={'filter'} mr={'sm'}/>
          <Icon glyph={'add'} mr={'sm'}/>
          <Icon glyph={'search'}/>
        </Box>
      ))}
    </>
  ))
  .add('Baseline', () => (
    <>
      <Text>Default text with <Icon glyph={'filter'} variant={'baseline'}/> on baseline</Text>
      <Text fontSize={'lg'}>Large text with <Icon glyph={'filter'} variant={'baseline'}/> on baseline</Text>
      <Button variant={'secondary'} size={'sm'} mr={'sm'}>
        <Icon glyph={'filter'} variant={'baseline'} mr={'xs'}/>
        Small
      </Button>
      <Button variant={'secondary'}>
        <Icon glyph={'filter'} variant={'baseline'} mr={'sm'}/>
        Default
      </Button>
    </>
  ))