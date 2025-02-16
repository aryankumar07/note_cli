import { getPath } from "../utils/getPath.js"
import fs from 'fs/promises'
import spinner from "../utils/getSpinner.js"
import chalk from "chalk"

export async function showList(filename, FolderName = ".local/share/Notes") {
  try {
    if (filename) {
      spinner.text = "Fetching Path ... "
      const filePath = await getPath(filename, FolderName)
      spinner.text = "confirming Path ... "
      await fs.access(filePath)
      spinner.text = "Loading Path"
      const data = await fs.readFile(filePath, 'utf-8')
      spinner.succeed(chalk.greenBright(`Here are the task for ${chalk.bold.whiteBright(filename.split('.')[0])}`))
      if (data.length === 0) {
      }
      console.log(chalk.blueBright(data))
    } else {
      spinner.text = "Fetching Path...."
      const folderPath = await getPath('', FolderName)
      spinner.text = "reading Files"
      const files = await fs.readdir(folderPath)
      const Names = files.map((file) => {
        return file.split('.')[0];
      })
      spinner.succeed(chalk.magentaBright("Here are Your Todo conatiners"))
      Names.forEach((filename, index) => console.log(index + 1, chalk.cyanBright(filename)))
    }
  } catch (e) {
    spinner.fail(chalk.redBright("Error in listing"), e)
  }
}
