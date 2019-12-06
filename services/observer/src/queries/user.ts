import { prisma } from '../__generated__/prisma-client'

export const getDapps = async () => {
  return prisma.users({
    where: {
      role: 'DAPP',
    },
  })
}

