import React from 'react'
import { Switch, Label, LabelProps } from '@rebass/forms'

export const Toggle = ({ checked, onChange, children, name, ...wrapperProps }: ToggleProps) => (
  <Label
    as='label'
    htmlFor={name}
    onClick={e => {
      // events fires twice, if we don't prevent the default behaviour
      e.preventDefault()

      onChange(e)
    }}
    {...wrapperProps}>
    {children}
    <Switch name={name} checked={checked} />
  </Label>
)

type ToggleProps = LabelProps & Required<Pick<LabelProps, 'onChange' | 'checked'>>
