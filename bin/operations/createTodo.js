import fs from 'fs/promises'
import { getPath } from "../utils/getPath.js";
import spinner from '../utils/getSpinner.js'
import chalk from 'chalk';

export async function createTodo(todo, filename, FolderName = ".local/share/Notes") {
  try {
    spinner.text = "Fetching and Validating Path .. "
    const filePath = await getPath(filename, FolderName)
    await fs.access(filePath)
    spinner.text = "Writing Todo"
    await fs.appendFile(filePath, `\n${todo}`)
    spinner.succeed(chalk.black.bgBlueBright('Todo added'))
  } catch (e) {
    console.log(chalk.redBright(e))
    spinner.fail(chalk.red("failed to add the todo"))
  }
}
