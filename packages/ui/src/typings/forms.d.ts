declare module '@rebass/forms' {
  import { FunctionComponent } from 'react'
  import { BoxProps, FlexProps } from 'rebass'

  export interface LabelProps extends FlexProps {
  }

  export const Label: FunctionComponent<LabelProps>

  export interface InputProps extends BoxProps {
  }

  export const Input: FunctionComponent<InputProps>

  export interface SelectProps extends FlexProps {
  }

  export const Select: FunctionComponent<SelectProps>

  export interface TextareaProps extends BoxProps {
  }

  export const Textarea: FunctionComponent<TextareaProps>

  export interface RadioProps extends BoxProps {
  }

  export const Radio: FunctionComponent<RadioProps>

  export interface CheckboxProps extends BoxProps {
  }

  export const Checkbox: FunctionComponent<CheckboxProps>

  export interface SliderProps extends BoxProps {
  }

  export const Slider: FunctionComponent<SliderProps>

  export interface SwitchProps extends BoxProps {
  }

  export const Switch: FunctionComponent<SwitchProps>
}