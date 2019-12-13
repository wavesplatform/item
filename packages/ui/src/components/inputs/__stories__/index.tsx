import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { Box, Flex } from 'rebass'
import { TextInput, TextInputWithIcon, TextInputWithUnit, ImageInput, TextArea } from '..'
import { Icon } from '../../icon'

storiesOf('Inputs', module)
  .add('Text Input', () => (
    <Box>
      <TextInput placeholder={'Tommy Vercetti'} mb={'md'}>
        Name
      </TextInput>
      <TextInput placeholder={'Tommy Vercetti'} disabled={true} mb={'md'}>
        Disabled
      </TextInput>
      <TextInput placeholder={'Tommy Vercetti'} variant={'input.flat'} mb={'md'}>
        Flat Input
      </TextInput>
      <TextInput placeholder={'Tommy Vercetti'} size={'lg'} mb={'md'}>
        Large Input
      </TextInput>
      <TextInput placeholder={'Without label'} mb={'md'} />
      <TextInput placeholder={'3123'} type={'number'} mb={'md'}>
        Number
      </TextInput>
      <TextInput mb='md' placeholder={'Tommy Vercetti'} sx={{ border: '2px dashed', borderColor: 'grays.7', p: 'md' }}>
        Styled only wrapper
      </TextInput>
      <TextArea placeholder='This is textarea' rows={5}>
        Textarea
      </TextArea>
    </Box>
  ))
  .add('With Unit', () => (
    <Box>
      <TextInputWithUnit placeholder={'123'} mb={'md'}>
        Value
      </TextInputWithUnit>
      <TextInputWithUnit placeholder={'123'} disabled mb={'md'}>
        Value
      </TextInputWithUnit>
    </Box>
  ))
  .add('With Icon', () => (
    <Box>
      <TextInputWithIcon placeholder={'Search items...'} glyph={'search'} variant={'input.flat'} mb={'md'} />
      <TextInputWithIcon placeholder={'Search items...'} glyph={'search'} variant={'input.flat'} size={'lg'} />
    </Box>
  ))
  .add('Image Input', () => {
    const [fileUrl, setFileUrl] = useState()
    const IMAGE_SIZE = 300
    const handleFileChoose = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.currentTarget.files && e.currentTarget.files[0]
      if (!file) return

      const fr = new FileReader()
      fr.readAsDataURL(file)
      fr.onloadend = () => setFileUrl(fr.result)
    }

    return (
      <ImageInput
        width={IMAGE_SIZE}
        height={IMAGE_SIZE}
        sx={{ borderRadius: 'lg', zIndex: 10 }}
        src={fileUrl}
        onChange={handleFileChoose}
        placeholder={
          <Flex
            alignItems='center'
            justifyContent='center'
            sx={{ border: '2px dashed', borderColor: 'white', borderRadius: 'lg' }}
            height='100%'>
            <Icon glyph='add' fontSize='10rem' />
          </Flex>
        }
      />
    )
  })
