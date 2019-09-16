export type FileUpload = {
  filename: string
  mimetype: string
  encoding: string
  createReadStream: any
}

/**
 * icons, pages, promos - images for dapps
 * items - copies of item images, for preserving
 */
export type EntityTypes = 'icons' | 'pages' | 'promos' | 'items'
