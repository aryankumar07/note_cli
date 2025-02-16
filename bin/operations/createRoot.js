import os from 'os'
import path from 'path'
import fs from 'fs/promises'


export async function createDir() {
  const basePath = os.homedir()
  const dirPath = path.join(basePath, '.local/share/Notes')
  await fs.mkdir(dirPath, { recursive: true })
  const filepath = path.join(dirPath, 'index.txt')
  await fs.writeFile(filepath, '')
  console.log(`created a dir at : ${dirPath}`)
}
