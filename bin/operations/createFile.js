import fs from 'fs/promises'
import { getPath } from "../utils/getPath.js"


export async function createFile(filename, FolderName = ".local/share/Notes") {
  const filePath = await getPath(filename, FolderName)
  try {
    await fs.access(filePath)
    conosle.log(`You already have a TODO container named : ${filename}`, '\n try using a new filename or deleting the previous one')
  } catch (e) {
    await fs.writeFile(filePath, '')
    console.log(`A Todo conatiner named ${filename} has been created`)
  }
} 
