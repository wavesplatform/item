import { config } from '../config'
import { EntityTypes, FileUpload } from '@item/types'
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

export const uploadImage = async (file: FileUpload, entity: EntityTypes, id: string): Promise<string> => {
  const { createReadStream, filename, mimetype } = await file
  const validMediaTypes = ['image/jpeg', 'image/png']

  if (!validMediaTypes.includes(mimetype)) {
    throw new Error('Incorrect file type')
  }

  const path = `storage.item.market/${config.production ? '' : 'dev/'}${entity}/${id}`
  const fileKey = uuidv4()
  const stream = createReadStream()

  return new Promise<string>(async (resolve, reject) => {
    s3.upload(
      {
        Bucket: path,
        Key: fileKey,
        Body: stream,
      },
      (err, data) => {
        if (err) {
          reject(err)
        }

        if (!data || !data.Key) {
          reject(new Error('Image upload failed. Please try again.'))
        }

        resolve(data.Location)
      },
    )
  })
}
