import os from 'os'
import path from 'path'
import fs from 'fs/promises'

export async function getPath(filename, folderPath) {
  const basePath = os.homedir()
  const baseFolder = path.join(basePath, folderPath)
  if (filename === '') return baseFolder
  try {
    await fs.access(baseFolder)
    const filePath = path.join(baseFolder, filename)
    return filePath
  } catch (e) {
    console.log(`[Failed to get path] : , \n${e} , \ntry using note init first`)
  }
} 
