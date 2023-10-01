import fs from 'fs'
import path from 'path'
import { Logs } from '../../../logs'
const deleteOldFiles = (): void => {
  const folderPath = 'public'

  try {
    const files = fs.readdirSync(folderPath)

    files.forEach(file => {
      const filePath = path.join(folderPath, file)
      const fileData = fs.statSync(filePath)
      if (!fileData.isFile()) return
      const currentDate = new Date()
      const currentDateLessOneHour = new Date(currentDate.getTime() - 60 * 60 * 1000)
      if (!(fileData.ctime < currentDateLessOneHour)) return
      fs.unlinkSync(filePath)
    })
  } catch (error) {
    Logs.Exception(error)
  }
}

export default deleteOldFiles
