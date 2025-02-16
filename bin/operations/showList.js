import { getPath } from "../utils/getPath.js"
import fs from 'fs/promises'

export async function showList(filename, FolderName = ".local/share/Notes") {
  try {
    if (filename) {
      const filePath = await getPath(filename, FolderName)
      await fs.access(filePath)
      const data = await fs.readFile(filePath, 'utf-8')
      console.log(`Here are the task for ${filename} `)
      console.log(data)
    } else {
      const folderPath = await getPath('', FolderName)
      const files = await fs.readdir(folderPath)
      const Names = files.map((file) => {
        return file.split('.')[0];
      })
      Names.forEach((filename) => console.log(filename))
    }

  } catch (e) {
    console.log("Error in listing", e)
  }
}
