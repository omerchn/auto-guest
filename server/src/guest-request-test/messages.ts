import { ChildProcess } from 'child_process'
import { ProcInput } from '.'

type Message =
  | {
      type: 'START'
      body: ProcInput
    }
  | {
      type: 'SOLVE'
      body: string
    }
  | {
      type: 'SUCCESS'
      body: string
    }
  | {
      type: 'ERROR'
      body: string | unknown
    }

interface Connect {
  to: ChildProcess | NodeJS.Process
  onMessage?: (msg: Message) => void
  onClose?: (code: number | null, signal: NodeJS.Signals | null) => void
  onExit?: (code: number | null, signal: NodeJS.Signals | null) => void
}

export function connect({ to, onMessage, onClose, onExit }: Connect) {
  const sendMessage = (msg: Message) => {
    to.send?.(msg)
  }

  if (onMessage) to.on('message', onMessage)
  if (onClose) to.on('close', onClose)
  if (onExit) to.on('exit', onExit)

  return {
    sendMessage,
  }
}
