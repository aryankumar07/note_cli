import yargs from "yargs/yargs";
import { hideBin } from 'yargs/helpers'
import { createDir } from "../operations/createRoot.js";
import { createFile } from "../operations/createFile.js"
import { createTodo } from "../operations/createTodo.js";
import { showList } from "../operations/showList.js";


function Command() {
  yargs(hideBin(process.argv))
    .command(
      'init',
      'Create the base folder',
      (yargs) => { },
      (argv) => {
        createDir()
      }
    )
    .command(
      'create <FileName>',
      'Create a specific named todo container',
      (yargs) => { },
      (argv) => {
        const filename = argv.FileName + '.txt'
        createFile(filename)
      }
    )
    .command(
      'list',
      'List all the Todo Container',
      (yargs) => {
        yargs.options('f', {
          alias: "filename",
          description: "specific file you want to perform action on",
          demandOption: false,
          type: 'string'
        })
      },
      (argv) => {
        let filename = null;
        if (argv.f) {
          filename = argv.f + '.txt'
        }
        showList(filename)
      }
    )
    .command(
      'add <Todo>',
      'Create a Todo',
      (yargs) => {
        yargs.options('f', {
          alias: "filename",
          description: "Name the specific file you want to add",
          demandOption: false,
          type: 'string'
        })
      },
      (argv) => {
        if (argv.Todo === undefined) {
          console.log("Please Specify a todo")
          return
        }
        const todo = argv.Todo
        let filename = 'index.txt';
        if (argv.f) {
          filename = argv.f + '.txt'
        }
        createTodo(todo, filename)
      }
    )
    .argv
}

export default Command
