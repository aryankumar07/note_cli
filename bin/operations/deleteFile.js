import fs from 'fs/promises'
import { showList } from "./showList.js"
import PromptSync from "prompt-sync"
import { getPath } from '../utils/getPath.js'


export async function deleteFile(filename, FolderName = ".local/share/Notes") {
  const prompt = PromptSync()
  try {
    console.log(`All The todos listed will also be erased`)
    await showList(filename, FolderName)
    const filePath = await getPath(filename, FolderName)
    const isDelete = prompt("Type 'Y(yes)' or 'N(no)' to perform action : ")
    if (isDelete.toLowerCase() === 'y' || isDelete.toLowerCase() === "yes") {
      await fs.unlink(filePath)
    } else if (isDelete.toLowerCase() === 'n' || isDelete.toLowerCase() === "no") {
      console.log('Aborted')
    } else {
      throw new Error("Please add a valid yes or no")
    }
  } catch (e) {
    console.log("error in deleteing file : ", e)
  }
}

