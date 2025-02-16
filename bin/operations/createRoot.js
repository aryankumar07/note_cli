import os from 'os'
import path from 'path'
import fs from 'fs/promises'
import spinner from '../utils/getSpinner.js'
import chalk from 'chalk'

export async function createDir() {
  try {
    const basePath = os.homedir()
    const dirPath = path.join(basePath, '.local/share/Notes')
    spinner.text = "making directory"
    await fs.mkdir(dirPath, { recursive: true })
    const filepath = path.join(dirPath, 'index.txt')
    spinner.text = "Creating an Empty file"
    await fs.writeFile(filepath, '')
    spinner.succeed(chalk.magenta(`created a dir at : ${chalk.cyan(dirPath)}`))
  } catch (e) {
    spinner.fail(chalk.red('failed to create root dir : '), e)
  }
}
