import React, { ChangeEvent } from 'react'
import { Flex } from 'rebass'
import { ImageInput } from '@item-protocol/ui'

export const EditableCover = ({ pageSRC, iconSRC, onPageChange, onIconChange }: CoverInput) => {
  return (
    <Flex mb='sm' alignItems='center' height={110} sx={{ position: 'relative' }} px='xl'>
      <ImageInput
        onChange={onPageChange}
        src={pageSRC}
        backgroundColor='grays.5'
        height='100%'
        width='100%'
        placeholder={<PageImagePlaceholder />}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          borderRadius: 'lg',
          '::before': {
            position: 'absolute',
            content: '""',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            background: pageSRC ? 'linear-gradient(to top,rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.2) 100%)' : 'none',
          },
        }}
      />
      <ImageInput
        width='48px'
        height='48px'
        backgroundColor='grays.7'
        src={iconSRC}
        onChange={onIconChange}
        sx={{
          position: 'relative',
          borderRadius: 'circle',
          zIndex: 2,
        }}
      />
    </Flex>
  )
}

interface CoverInput {
  pageSRC?: string
  onPageChange: (ev: ChangeEvent<HTMLInputElement>) => void
  iconSRC?: string
  onIconChange: (ev: ChangeEvent<HTMLInputElement>) => void
}

const PageImagePlaceholder = () => (
  <Flex
    justifyContent='center'
    alignItems='center'
    width='100%'
    height='100%'
    bg='black'
    sx={{
      zIndex: 1,
      borderRadius: 'lg',
      border: '2px dashed',
      borderColor: 'grays.7',
    }}>
    Set Cover Image
  </Flex>
)
