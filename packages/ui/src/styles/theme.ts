import { buttonVariant, fades } from './mixins'

export type StyleSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const preset: any = {
  breakpoints: ['40em', '52em', '64em'],
  fonts: {
    body: '-apple-system, "Segoe UI", system-ui, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif',
    heading: 'inherit',
    monospace: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
  fontSizes: [12, 14, 16, 20, 24, 32],
  fontWeights: [300, 400, 700],
  colors: {
    white: '#ffffff',
    black: '#050c19',
    blue: '#204AC6',
    green: '#28a745',
    red: '#dc3545',
    yellow: '#efc62d',
    orange: '#fd7e14',
    grays: [
      '#e6e7e8', // 0
      '#d5d6d9',
      '#b4b6ba',
      '#9b9ea3',
      '#696d75',
      '#50555e',
      '#343a47',
      '#1e2430',
      '#111725', // 8
    ],
  },
  space: [0, 4, 8, 12, 16, 24, 32, 64],
  lineHeights: [1, 1.25, 1.5, 2],
  radii: [0, 4, 6, 8, 16],
}
const { fontSizes, fontWeights, colors, space, lineHeights, radii } = preset

fontSizes.xs = fontSizes[0]
fontSizes.sm = fontSizes[1]
fontSizes.md = fontSizes[2]
fontSizes.lg = fontSizes[3]
fontSizes.xl = fontSizes[4]
fontSizes.body = fontSizes.md

fontWeights.body = fontWeights[1]
fontWeights.heading = fontWeights[2]
fontWeights.bold = fontWeights[2]

// Fades
colors.whites = fades(colors.white)
colors.blacks = fades(colors.black)

colors.text = colors.grays[0]
colors.background = colors.black
colors.primary = colors.blue
colors.secondary = colors.grays[7]
colors.success = colors.green
colors.danger = colors.red
colors.warn = colors.yellow
colors.info = colors.blue
colors.light = colors.white
colors.dark = colors.grays[8]

space.xs = space[1]
space.sm = space[2]
space.md = space[3]
space.lg = space[4]
space.xl = space[5]

lineHeights.body = lineHeights[2]
lineHeights.heading = lineHeights[1]

radii.sm = radii[1]
radii.md = radii[2]
radii.lg = radii[3]
radii.xl = radii[4]
radii.circle = 99999

const buttons = {
  primary: { ...buttonVariant(colors.primary) },
  secondary: { ...buttonVariant(colors.secondary) },
  success: { ...buttonVariant(colors.success) },
  danger: { ...buttonVariant(colors.danger) },
  warn: { ...buttonVariant(colors.warn) },
  info: { ...buttonVariant(colors.info) },
  light: { ...buttonVariant(colors.light), color: colors.dark },
  dark: { ...buttonVariant(colors.dark) },
}

const forms = {
  field: {
    borderWidth: '2px',
    borderColor: 'grays.7',
    px: 'md',
    py: 'sm',
    borderRadius: 'md',
    outline: 'none',
    '::placeholder': {
      color: 'grays.4',
    },
    '&:focus, &:focus-within': {
      borderColor: 'grays.6',
      boxShadow: `0 0 0 1px ${colors.grays[6]}`,
    },
  },
  flatField: {
    variant: 'forms.field',
    borderColor: 'transparent',
    bg: 'grays.8',
    '&:focus, &:focus-within': {
      borderColor: 'transparent',
      boxShadow: 'none',
    },
  },
  input: {
    variant: 'forms.field',
    flat: {
      variant: 'forms.flatField',
    },
  },
}

const dropdown = {
  list: {
    bg: 'background',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'grays.7',
  },
  item: {
    borderColor: 'grays.7',

    active: {
      bg: 'grays.8',
    },

    '&:hover, &:focus': {
      variant: 'dropdown.item.active',
    },
  },
}

export const baseTheme = {
  ...preset,
  buttons,
  forms,
  dropdown,
}
