import axios from 'axios'
import { uploadImageWithStream } from './s3'
import https from 'https'
import { EntityTypes } from '@item/types'

export const getFileStream = (url: string, maxFileSizeByte: number) => {
  return axios.get(url, {
    maxContentLength: maxFileSizeByte,
    responseType: 'stream',

    // Ignore ssl errors
    // See: https://github.com/axios/axios/issues/535
    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  })
}

export const uploadFileByUrl = async (url: string, entity: EntityTypes, id: string, maxFileSizeByte: number) => {
  try {
    // Start download file by stream
    const res = await getFileStream(url, maxFileSizeByte)

    if (res.status !== 200) {
      throw new Error('Invalid file url')
    }

    // Get steam pass and promise
    const { pass, promise } = uploadImageWithStream(res.headers['content-type'], 'items', id)

    res.data.pipe(pass)

    return promise
  } catch (err) {
    throw err
  }
}