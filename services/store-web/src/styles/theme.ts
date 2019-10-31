import { baseTheme } from '@item/ui'

const header = {
  bg: 'background',
  borderBottom: '1px solid',
  borderColor: 'grays.7',
  position: 'fixed',
  zIndex: 3,
}

const navs = {
  default: {
    color: 'text',
  },
  active: {
    bg: 'grays.8',
  },
  item: {
    variant: 'navs.default',
    '&:hover, &:focus': {
      variant: 'navs.active',
    },
    active: {
      variant: 'navs.active',
    },
  },
}

export const theme = {
  ...baseTheme,
  header,
  navs,
}