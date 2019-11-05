import { MutationResolvers } from '../__generated__/graphqlgen'
import { createToken, verifySignature } from '../helpers/auth'
import { uploadImage } from '../helpers/s3'
import { FileUpload } from '@item/types'

export const Mutation: MutationResolvers.Type = {
  ...MutationResolvers.defaultResolvers,

  signin: async (parent, { input }, ctx) => {
    const { address, publicKey, sign, webappHost } = input
    // Validate signature
    try {
      const valid = await verifySignature(sign, publicKey, webappHost)
      if (!valid) {
        throw new Error('Incorrect signature')
      }
    } catch (err) {
      throw err
    }

    let user = await ctx.prisma.user({
      address,
    })

    if (!user) {
      // Create user
      user = await ctx.prisma.createUser({
        address,
        permissions: { set: ['COMMON'] },
      })
    }

    // Get permissions
    const permissions = user.permissions

    return {
      // Create token
      token: createToken({ address, signature: sign, permissions }),
      user,
    }
  },

  updateUserInfo: (parent, { input }, ctx) => {
    const { address } = ctx.me
    const { name, email } = input

    return ctx.prisma.updateUser({
      where: {
        address,
      },
      data: {
        name,
        email,
      },
    })
  },

  updateDappInfo: async (parent, { input }, ctx) => {
    const { name, url, description } = input
    const { address } = ctx.me

    try {
      const user = await ctx.prisma.user({ address })
      const meta = user.meta || {}
      const image = user.image || {}

      if (input.pageFile) {
        // @ts-ignore
        image.page = await uploadImage(input.pageFile as FileUpload, 'pages', address)
      }

      if (input.iconFile) {
        // @ts-ignore
        image.icon = await uploadImage(input.iconFile as FileUpload, 'icons', address)
      }

      meta.url = url || meta.url
      meta.description = description || meta.description

      return ctx.prisma.updateUser({
        where: {
          address,
        },
        data: {
          name,
          meta,
          image,
        },
      })
    } catch (err) {
      throw err
    }
  },
}
