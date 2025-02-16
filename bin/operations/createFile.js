import fs from 'fs/promises'
import { getPath } from "../utils/getPath.js"
import spinner from '../utils/getSpinner.js'
import chalk from 'chalk'

export async function createFile(filename, FolderName = ".local/share/Notes") {
  spinner.text = "Fetching path"
  const filePath = await getPath(filename, FolderName)
  try {
    spinner.text = "Verfying Path"
    await fs.access(filePath)
    spinner.fail(`${chalk.red('You already have a TODO container named :')} ${chalk.bold.white(filename)}`)
    console.log(chalk.magenta("try using a deferent name for the conatiner"))
  } catch (e) {
    spinner.text = "Writing in File"
    await fs.writeFile(filePath, '')
    spinner.succeed(`${chalk.green(`A Todo conatiner named ${chalk.bold.white(filename)} has been created`)}`)
  }
} 
