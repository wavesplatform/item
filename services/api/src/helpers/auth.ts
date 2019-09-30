import { sign, verify } from 'jsonwebtoken'
import { config } from '../config'
import { generate, StringWithLength, utils } from '@waves/signature-generator'
import { UserPermission } from '../__generated__/prisma-client'

//@ts-ignore
const generator = new generate([
  new StringWithLength('prefix'),
  new StringWithLength('host'),
  new StringWithLength('data'),
])

export type TokenPayload = {
  address: string
  signature: string
  permissions: UserPermission[]
}

export const createToken = (payload: TokenPayload): string => {
  return sign(payload, config.jwtSecret)
}

export const decodeToken = async (token: string): Promise<TokenPayload> => {
  return (await verify(token, config.jwtSecret)) as TokenPayload
}

export const verifySignature = async (signature: string, publicKey: string, webappHost: string): Promise<boolean> => {
  const bytes = await getAuthBytes(webappHost)

  return utils.crypto.isValidSignature(bytes, signature, publicKey)
}

export const getAuthBytes = async (webappHost: string): Promise<Uint8Array> => {
  const bytesGenerator = new generator({
    host: webappHost,
    prefix: 'WavesWalletAuthentication',
    data: config.authData,
  })
  const bytes = await bytesGenerator.getBytes()

  return bytes
}
