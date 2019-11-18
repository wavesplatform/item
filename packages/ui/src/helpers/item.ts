import { IItem } from '@item/types'
import { defaultImage } from '../components/image'

export const getImageSrc = ({ params }: IItem) => {
  return params.storageImageUrl || params.imageUrl || defaultImage
}