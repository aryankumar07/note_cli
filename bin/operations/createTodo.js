import fs from 'fs/promises'
import { getPath } from "../utils/getPath.js";
import spinner from '../utils/getSpinner.js'
import chalk from 'chalk';



// one of sending optional parameter to a function or using ...argc 
// export async function createTodo(todo, filename, { folderName = ".local/share/Notes", priority = "low" } = {}) {


export async function createTodo(todo, filename, priority, FolderName = ".local/share/Notes") {
  try {

    spinner.text = "Fetching and Validating Path .. "
    const filePath = await getPath(filename, FolderName)
    await fs.access(filePath)
    spinner.text = "Writing Todo"
    const todoJson = {
      todo: todo,
      priority: priority
    }

    await fs.appendFile(filePath, `\n${JSON.stringify(todoJson)}`)
    spinner.succeed(chalk.black.bgBlueBright('Todo added'))
  } catch (e) {
    console.log(chalk.redBright(e))
    spinner.fail(chalk.red("failed to add the todo"))
  }
}
