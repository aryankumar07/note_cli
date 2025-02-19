import fs from 'fs/promises'
import { showList } from "./showList.js"
import PromptSync from "prompt-sync"
import { getPath } from '../utils/getPath.js'
import spinner from '../utils/getSpinner.js'
import chalk from 'chalk'

export async function deleteFile(filename, FolderName = ".local/share/Notes") {
  const prompt = PromptSync()
  try {
    if (filename === "index.txt") {
      spinner.warn(chalk.redBright(`Deleting this file is not recommended : ${chalk.greenBright('Y(yes)')} : ${chalk.redBright('N(no)')}`));
      const forceDelete = prompt()
      if (forceDelete.toLowerCase() === 'n' || forceDelete.toLowerCase() === 'no') return spinner.succeed('Aborted');
    }
    console.log(chalk.bgRedBright.black(`All The todos listed will also be erased`))
    spinner.text = "Fetching Todos"
    await showList(filename, FolderName)
    const filePath = await getPath(filename, FolderName)
    const isDelete = prompt(`Type ${chalk.greenBright('Y(yes)')} or ${chalk.redBright('N(no)')} to perform action : `)
    if (isDelete.toLowerCase() === 'y' || isDelete.toLowerCase() === "yes") {
      spinner.text = "Removing File and todos"
      await fs.unlink(filePath)
      spinner.succeed(chalk.blueBright("deleted the container and todos"))
    } else if (isDelete.toLowerCase() === 'n' || isDelete.toLowerCase() === "no") {
      spinner.warn(chalk.magentaBright('Aborted'))
    } else {
      throw new Error("Please add a valid yes or no")
    }
  } catch (e) {
    spinner.fail(chalk.redBright("error in deleteing file : "), e)
  }
}

