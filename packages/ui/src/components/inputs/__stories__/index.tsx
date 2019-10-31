import React from 'react'
import { storiesOf } from '@storybook/react'
import { Box } from 'rebass'
import { TextInput, TextInputWithIcon, TextInputWithUnit } from '../index'

storiesOf('Inputs', module)
  .add('Text Input', () => (
    <Box>
      <TextInput placeholder={'Tommy Vercetti'} mb={'md'}>Name</TextInput>
      <TextInput placeholder={'Tommy Vercetti'} variant={'input.flat'} mb={'md'}>Flat Input</TextInput>
      <TextInput placeholder={'Tommy Vercetti'} size={'lg'} mb={'md'}>Large Input</TextInput>
      <TextInput placeholder={'Without label'} mb={'md'}/>
      <TextInput placeholder={'3123'} type={'number'} mb={'md'}>Number</TextInput>
      <TextInput placeholder={'Tommy Vercetti'}
                 sx={{ border: '2px dashed', borderColor: 'grays.7', p: 'md' }}
      >Styled only wrapper</TextInput>
    </Box>
  ))
  .add('With Unit', () => (
    <Box>
      <TextInputWithUnit placeholder={'123'} mb={'md'}>Value</TextInputWithUnit>
    </Box>
  ))
  .add('With Icon', () => (
    <Box>
      <TextInputWithIcon placeholder={'Search items...'} glyph={'search'} variant={'input.flat'} mb={'md'}/>
      <TextInputWithIcon placeholder={'Search items...'} glyph={'search'} variant={'input.flat'} size={'lg'}/>
    </Box>
  ))