import stream from 'stream'
import config from './config'
import { EntityTypes } from '@item/types'
import uuidv4 = require('uuid/v4')
import S3 = require('aws-sdk/clients/s3')

const s3 = new S3({
  credentials: {
    accessKeyId: config.s3.token,
    secretAccessKey: config.s3.secret,
  },
  region: 'eu-central-1',
  sslEnabled: true,
})

export const uploadImageWithStream = (mimetype: string, entity: EntityTypes, id: string) => {
  const validMediaTypes = ['image/jpeg', 'image/png']
  const path = `${config.bucketName}/${config.production ? '' : 'dev/'}${entity}/${id}`
  const fileKey = uuidv4()

  if (!validMediaTypes.includes(mimetype)) {
    throw new Error('Incorrect file type')
  }

  const pass = new stream.PassThrough()
  const promise = s3
    .upload({
      Bucket: path,
      Key: fileKey,
      Body: pass,
    })
    .promise()

  return { pass, promise }
}
