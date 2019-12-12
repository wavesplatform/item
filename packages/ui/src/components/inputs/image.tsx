import React, { ChangeEvent, ReactNode } from 'react'
import { Image, BoxProps, Box } from 'rebass'
import { Input } from '@rebass/forms'

export const ImageInput = ({ src, onChange, placeholder, sx, ...labelProps }: ImageInputProps) => {
  return (
    <Box
      as='label'
      overflow='hidden'
      sx={{
        cursor: 'pointer',
        display: 'block',
        borderRadius: 800,
        ...sx,
      }}
      {...labelProps}>
      {src ? (
        <Image
          height='100%'
          width='100%'
          src={src}
          sx={{
            objectFit: 'cover',
          }}
        />
      ) : (
        placeholder
      )}
      <Input
        width={0}
        height={0}
        type='file'
        id='file'
        name='file'
        accept={'.png, .jpg, .jpeg'}
        multiple={false}
        onChange={onChange}
        sx={{
          visibility: 'hidden',
        }}
      />
    </Box>
  )
}

interface ImageInputProps extends Omit<BoxProps, 'placeholder'> {
  src?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder?: ReactNode
}
