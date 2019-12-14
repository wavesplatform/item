import { prisma } from '../__generated__/prisma-client'

const args = process.argv.slice(2)
if (!args.length) {
  throw new Error('Incorrect args')
}

const address = process.argv.slice(2)[0]
prisma
  .updateUser({
    where: {
      address,
    },
    data: {
      role: 'DAPP',
      permissions: { set: ['COMMON', 'DAPP'] },
    },
  })
  .then(res => {
    console.log(res)
  })

