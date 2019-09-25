import { transparentize } from 'polished'

export const buttonVariant = (bg: string) => ({
  backgroundColor: bg,
  '&:hover': {
    backgroundColor: transparentize(0.1, bg),
  },
})