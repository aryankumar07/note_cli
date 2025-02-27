import chalk from "chalk"
import spinner from "../utils/getSpinner.js"
import fs from 'fs/promises'
import PromptSync from "prompt-sync"
import { exec } from "child_process"
import { getPath } from "../utils/getPath.js"
import { showList } from "./showList.js"


async function uninstallNotes(FolderName = ".local/share/Notes") {
  const prompt = PromptSync()
  try {
    // remove the whole notes directory

    console.log(chalk.magentaBright('All of Your Listed Container will be erased '))
    await showList(null)

    const Delete = prompt(`Are You sure you want to Unisntall ${chalk.redBright('YES')} : ${chalk.greenBright('NO')} => `).toLowerCase()
    if (Delete === 'no' || Delete === 'n') {
      spinner.warn("Nice choice : appreciated")
      return;
    }


    const filePath = await getPath('', FolderName)
    await fs.rm(filePath, { recursive: true })


    // remove the note one form /usr/local/bin/note
    const RootPath = '/usr/local/bin/note'
    await fs.access(RootPath)
    exec('sudo rm /usr/local/bin/note', (error, _, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
      }
    });

    spinner.succeed('Notes removed succesfully')
  } catch (e) {
    spinner.fail(chalk.redBright(`Failed to Uninstall try again : ${e} `))
  }
}


export { uninstallNotes }
