import fs from 'fs/promises'
import { getPath } from "../utils/getPath.js"

export async function markDone(todo, filename, clear, FolderName = ".local/share/Notes") {
  try {
    const filepath = await getPath(filename, FolderName)
    console.log(filepath)
    await fs.access(filepath)
    if (clear) {
      await fs.writeFile(filepath, '')
      console.log("Removed all todo")
    } else {
      const data = await fs.readFile(filepath, 'utf-8')
      const todos = data.split('\n')
      if (todos.indexOf(todo) !== -1) {
        todos.splice(todos.indexOf(todo), 1);
        await fs.writeFile(filepath, '')
        todos.forEach(async (todo) => {
          await fs.appendFile(filepath, todo + '\n')
        })
        console.log('Todo updated')
      } else {
        console.log("No todo of such exist")
      }
    }
  } catch (e) {
    console.log('error in removing todo', e)
  }
}
