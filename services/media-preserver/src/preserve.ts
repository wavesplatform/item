import { uploadFileByUrl } from './files'
import Debug from 'debug'
import config from './config'
import { EntityTypes, OPERATION_TYPE } from '@item/types'
import { Job, PreserveMediaJobData, queues } from '@item/queues'

const debug = Debug('media-preserver')

// In
const preserveMediaQueue = queues.preserveMediaQueue

// Out
const paramsOpsQueue = queues.paramsOpsQueue

const minuteMs = 60 * 1000

export const initProcessMedia = () => {
  preserveMediaQueue.process(processMedia)
}

const processMedia = async ({ data: { url, entity, id } }: Job<PreserveMediaJobData>) => {
  try {
    const storageImageUrl = await uploadImageByUrl(url, entity, id)

    switch (entity) {
      case 'items':
        // Update item params by id
        // You must be sure that params are created
        await paramsOpsQueue.add({
          type: OPERATION_TYPE.UPDATE,
          data: {
            paramsId: id,
            storageImageUrl,
          },
        })
        break
    }
  } catch (err) {
    debug(err.message)
    throw err
  }
}

/**
 * Get origin url, download and upload to storage.
 * Gives new media url.
 * @param url
 * @param entity
 * @param id
 */
export const uploadImageByUrl = (url: string, entity: EntityTypes, id: string): Promise<string> => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const data = await uploadFileByUrl(url, entity, id, config.itemMaxImageSizeByte)

      if (!data || !data.Key) {
        reject(new Error('Image upload failed. Please try again.'))
      }

      resolve(data.Location)
    } catch (err) {
      reject(err)
    }
  })
}
