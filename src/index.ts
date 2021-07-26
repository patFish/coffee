import { ask } from 'stdio'
import { handleInstruction } from './draw'
;(async () => {
  let isExit: boolean = false
  while (!isExit) {
    const answer: string = await ask('Enter command')
    isExit = handleInstruction(answer)
  }
})()
