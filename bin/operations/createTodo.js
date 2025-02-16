import fs from 'fs/promises'
import { getPath } from "../utils/getPath.js";

export async function createTodo(todo, filename, FolderName = ".local/share/Notes") {
  try {
    const filePath = await getPath(filename, FolderName)
    await fs.access(filePath)
    await fs.appendFile(filePath, `\n${todo}`)
    console.log('Todo added')
  } catch (e) {
    console.log("failed to add the todo", e)
  }
}
