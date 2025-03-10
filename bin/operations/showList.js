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

      const highTodo = []
      const mediumTodo = []
      const lowTodo = []

      let data = await fs.readFile(filePath, 'utf-8')

      data = data.split('\n').filter((todo) => todo === '' ? false : true).forEach((singleTodo) => {
        const TodoJson = JSON.parse(singleTodo)
        if (TodoJson.priority === "high") {
          highTodo.push(TodoJson.todo)
        } else if (TodoJson.priority === "medium") {
          mediumTodo.push(TodoJson.todo)
        } else {
          lowTodo.push(TodoJson.todo)
        }
      })



      spinner.succeed(chalk.greenBright(`Here are the task for ${chalk.bold.whiteBright(filename.split('.')[0])}`))


      console.log(chalk.blueBright("High priority Task : "))
      if (highTodo.length === 0) {
        console.log(chalk.magentaBright("No Task"))
      } else {
        highTodo.forEach((TODO, index) => {
          console.log(` ${index + 1} : ${chalk.redBright(TODO)}`)
        })
      }

      console.log(chalk.blueBright("Medium priority Task : "))
      if (mediumTodo.length === 0) {
        console.log(chalk.magentaBright("No Task"))
      } else {
        mediumTodo.forEach((TODO, index) => {
          console.log(` ${index + 1} : ${chalk.yellowBright(TODO)}`)
        })
      }


      console.log(chalk.blueBright("Low priority Task : "))
      if (lowTodo.length === 0) {
        console.log(chalk.magentaBright("No Task"))
      } else {
        lowTodo.forEach((TODO, index) => {
          console.log(` ${index + 1} : ${chalk.greenBright(TODO)}`)
        })
      }
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
