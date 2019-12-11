import React from 'react'
import { Input } from '@rebass/forms'
import { Flex, FlexProps } from 'rebass'

export const Toggle = ({ checked, onChange, children, ...flexProps }: ToggleProps) => (
  <Flex onClick={onChange} sx={{ cursor: 'pointer' }} {...flexProps}>
    {children}
    <ToggleControl onChange={onChange} checked={checked} />
  </Flex>
)

const TOGGLE_HEIGHT = '1.6rem'

const ToggleControl = ({ checked, onChange }: ToggleControlProps) => (
  <>
    <Flex
      ml='sm'
      width={`calc(2 * ${TOGGLE_HEIGHT})`}
      height={TOGGLE_HEIGHT}
      backgroundColor={checked ? 'primary' : 'secondary'}
      sx={{
        position: 'relative',
        borderRadius: 'xl',

        ':before': {
          content: '""',
          width: '50%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: checked ? '50%' : 0,

          backgroundColor: 'text',
          borderRadius: 'circle',
          transition: 'left 0.1s ease',
          transform: 'scale(0.8)',
        },
      }}
    />
    <Input checked={checked} onChange={onChange} width={0} height={0} type='checkbox' sx={{ visibility: 'hidden' }} />
  </>
)

interface ToggleProps extends FlexProps {
  checked: boolean
  onChange: () => void
}

interface ToggleControlProps extends Pick<ToggleProps, 'checked' | 'onChange'> {}
