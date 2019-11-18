import React, { ChangeEvent } from 'react'
import { Box, Flex, FlexProps } from 'rebass'
import { Input, InputProps, Label } from '@rebass/forms'
import { Icon } from '../icon'
import { variant } from 'styled-system'
import { StyleSize } from '../../styles'
import styled from '@emotion/styled'

export interface TextInputProps extends FlexProps {
  defaultValue?: string
  value?: any
  placeholder?: string
  onChange?: (ev: ChangeEvent<HTMLInputElement>) => void
  autoFocus?: boolean
  disabled?: boolean
  id?: string
  type?: string
  size?: StyleSize
}

export const TextInput = ({ children, variant = 'input', ...rest }: TextInputProps) => {
  const { id } = rest
  return (
    <Wrapper {...rest}>
      {children && <Label htmlFor={id} mb={'sm'}>{children}</Label>}
      <FilledInput {...rest} variant={variant}/>
    </Wrapper>
  )
}

export interface TextInputWithUnitProps extends TextInputProps {
  unit?: string
}

export const TextInputWithUnit = ({ children, variant = 'input', unit, ...rest }: TextInputWithUnitProps) => {
  const { id, disabled } = rest

  return (
    <Wrapper {...rest}>
      {children && <Label htmlFor={id} mb={'sm'}>{children}</Label>}
      <DummyInput variant={variant} disabled={disabled}>
        <InnerInput {...rest} variant={variant}/>
        <Flex
          sx={{
            alignItems: 'center',
            textTransform: 'uppercase',
            borderLeftStyle: 'solid',
            borderLeftColor: 'grays.6',
            borderLeftWidth: '1px',
            px: 'md',
            fontSize: 'sm',
            color: 'grays.4',
          }}
        >
          {unit ? unit : 'Waves'}
        </Flex>
      </DummyInput>
    </Wrapper>
  )
}

export interface TextInputWithIconProps extends TextInputProps {
  glyph?: string
}

export const TextInputWithIcon = (
  { children, variant = 'input', glyph, ...rest }: TextInputWithIconProps,
) => {
  const { id, disabled } = rest

  return (
    <Wrapper {...rest}>
      {children && <Label htmlFor={id} mb={'sm'}>{children}</Label>}
      <DummyInput sx={{ flexDirection: 'row-reverse' }} variant={variant} disabled={disabled}>
        <InnerInput {...rest} variant={variant}/>
        {glyph && <Box sx={{
          lineHeight: 1,
          pl: 'md',
          fontSize: 'lg',
          color: 'grays.4',
        }}><Icon glyph={glyph}/></Box>}
      </DummyInput>
    </Wrapper>
  )
}

const Wrapper = (props: TextInputProps) => {
  // Exclude input props
  const {
    variant,
    defaultValue,
    value,
    placeholder,
    onChange,
    autoFocus,
    disabled,
    id,
    type,
    size,
    ...wrapper
  } = props

  return (
    <Flex flexDirection={'column'} width={1} {...wrapper} />
  )
}

const FilledInput = (
  { defaultValue, value, placeholder, onChange, autoFocus, disabled, id, variant, type, sx, size }: TextInputProps,
) =>
  <StyledInput
    id={id}
    defaultValue={defaultValue}
    name={id}
    value={value}
    placeholder={placeholder}
    onChange={onChange}
    autoFocus={autoFocus}
    disabled={disabled}
    variant={variant}
    type={type}
    sx={{
      opacity: disabled ? .5 : 1,
      ...sx,
    }}
    size={size}
  />

const InnerInput = (props: TextInputProps) =>
  <FilledInput
    {...props}
    sx={{
      bg: 'transparent',
      borderWidth: 0,
      borderRadius: 0,
      flex: '1',
      '&:focus': { boxShadow: 'none' },
    }}
  />

const DummyInput = ({ sx, ...rest }: InputProps) => {
  const { disabled } = rest
  return <StyledInput
    as={'div'}
    {...rest}
    sx={{
      display: 'flex',
      alignItems: 'center',
      p: 0,
      opacity: disabled ? .5 : 1,
      ...sx,
    }}
  />
}

const inputSizeStyle = variant({
  prop: 'size',
  variants: {
    lg: {
      fontSize: '1.1rem',
      px: 'lg',
      py: 'md',
    },
  },
})

const StyledInput = styled(Input)`
  ${inputSizeStyle};
`

