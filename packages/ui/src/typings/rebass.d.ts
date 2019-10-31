declare module 'rebass' {
  import { ElementType, FunctionComponent, HTMLProps, RefAttributes } from 'react'
  import * as StyledSystem from 'styled-system'
  import { CSSObject, ResponsiveStyleValue, SystemStyleObject } from '@styled-system/css'

  export {}

  type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

  export interface BaseProps extends RefAttributes<any> {
    as?: ElementType
    css?:
      | CSSObject
      | string
  }

  export type SxStyleProp = SystemStyleObject |
    Record<string,
      | SystemStyleObject
      | ResponsiveStyleValue<number | string>
      | Record<string, SystemStyleObject | ResponsiveStyleValue<number | string>>>

  export interface SxProps {
    sx?: SxStyleProp
  }

  interface BoxKnownProps
    extends BaseProps,
      StyledSystem.SpaceProps,
      StyledSystem.LayoutProps,
      StyledSystem.FontSizeProps,
      StyledSystem.ColorProps,
      StyledSystem.FlexProps,
      StyledSystem.OrderProps,
      StyledSystem.AlignSelfProps,
      SxProps {
    variant?: StyledSystem.ResponsiveValue<string>
    tx?: string
  }

  export interface BoxProps
    extends BoxKnownProps,
      Omit<HTMLProps<HTMLDivElement>, keyof BoxKnownProps> {
  }

  export const Box: FunctionComponent<BoxProps>

  interface ButtonKnownProps
    extends BoxKnownProps,
      StyledSystem.FontWeightProps,
      StyledSystem.ButtonStyleProps {
  }

  export interface ButtonProps
    extends ButtonKnownProps,
      Omit<HTMLProps<HTMLButtonElement>, keyof ButtonKnownProps> {
  }

  export const Button: FunctionComponent<ButtonProps>

  export interface CardProps
    extends BoxKnownProps,
      Omit<HTMLProps<HTMLDivElement>, keyof BoxKnownProps> {
  }

  export const Card: FunctionComponent<BoxKnownProps>

  interface FlexKnownProps
    extends BoxKnownProps,
      StyledSystem.FlexWrapProps,
      StyledSystem.FlexDirectionProps,
      StyledSystem.AlignItemsProps,
      StyledSystem.JustifyContentProps {
  }

  export interface FlexProps
    extends FlexKnownProps,
      Omit<HTMLProps<HTMLDivElement>, keyof FlexKnownProps> {
  }

  export const Flex: FunctionComponent<FlexProps>

  export interface ImageProps
    extends BoxKnownProps,
      Omit<HTMLProps<HTMLImageElement>, keyof BoxKnownProps> {
  }

  export const Image: FunctionComponent<ImageProps>

  interface LinkKnownProps extends BoxKnownProps {
  }

  export interface LinkProps
    extends LinkKnownProps,
      Omit<HTMLProps<HTMLAnchorElement>, keyof LinkKnownProps> {
  }

  export const Link: FunctionComponent<LinkProps>

  interface TextKnownProps
    extends BoxKnownProps,
      StyledSystem.FontFamilyProps,
      StyledSystem.FontWeightProps,
      StyledSystem.TextAlignProps,
      StyledSystem.LineHeightProps,
      StyledSystem.LetterSpacingProps {
  }

  export interface TextProps
    extends TextKnownProps,
      Omit<HTMLProps<HTMLDivElement>, keyof TextKnownProps> {
  }

  export const Text: FunctionComponent<TextProps>

  export interface HeadingProps
    extends TextKnownProps,
      Omit<HTMLProps<HTMLHeadingElement>, keyof TextKnownProps> {
  }

  export const Heading: FunctionComponent<HeadingProps>
}