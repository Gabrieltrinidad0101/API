import mime from 'mime-types'

export default function getMessageMediaExtension (filePath: string): string | false {
  const mimeType = mime.lookup(filePath)
  if (mimeType === false) return false
  return mimeType
}
