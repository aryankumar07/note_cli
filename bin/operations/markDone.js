import fs from 'fs/promises'
import { getPath } from "../utils/getPath.js"
import spinner from '../utils/getSpinner.js'
import chalk from 'chalk'

export async function markDone(todo, filename, clear, FolderName = ".local/share/Notes") {
  try {
    spinner.text = "fetching and Validating path"
    const filepath = await getPath(filename, FolderName)
    await fs.access(filepath)
    if (clear) {
      await fs.writeFile(filepath, '')
      spinner.succeed(chalk.redBright("Removed all todo"))
    } else {
      spinner.text = "Reading Files"
      const data = await fs.readFile(filepath, 'utf-8')
      const todos = data.split('\n').filter((todo) => todo === '' ? false : true);
      let index = todos.reduce((acc, curr, index) => {
        if (JSON.parse(curr).todo === todo) {
          acc = index;
          return acc;
        }
      }, -1)
      if (index !== -1) {
        todos.splice(index, 1);
        await fs.writeFile(filepath, '')
        todos.forEach(async (todo) => {
          await fs.appendFile(filepath, '\n' + todo)
        })
        spinner.succeed(chalk.blueBright('Todo updated'))
      } else {
        spinner.fail(chalk.redBright("No todo of such exist"))
      }
    }
  } catch (e) {
    spinner.fail(chalk.redBright('error in removing todo'), e)
  }
}
