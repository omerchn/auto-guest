import path from 'path'
import { fork, ChildProcess } from 'child_process'
import { v4 as uuid } from 'uuid'
import { connect } from './messages'

export interface RequestInput {
  student: {
    id: string
    fullName: string
    phone: string
    dorm: 'מעונות איינשטיין' | 'מעונות ברושים'
    building: string
    floor: string
    apartmentNumber: string
    side: 'ימין' | 'שמאל'
  }
  category: 'פניות בנושא מבקרים' | 'פניות בנושא לינה'
  guest: {
    id: string
    fullName: string
    phone: string
  }
}

export interface ProcInput {
  procId: string
  input: RequestInput
}

const procCache: {
  [procId: string]: ChildProcess
} = {}

type ProcId = string
export async function test(input: RequestInput): Promise<ProcId> {
  return new Promise((resolve, reject) => {
    const proc = fork(path.resolve(__dirname, './proc.ts'))
    proc.on('message', (m) => {
      console.log(m)
      // resolve(m as string)
    })
    proc.on('exit', () => {
      console.log('exit')
      reject()
    })
  })
}
export function createRequest(input: RequestInput): Promise<ProcId> {
  return new Promise((resolve, reject) => {
    const procId = uuid()
    const proc = fork('ts-node', [path.resolve(__dirname, 'proc.ts')])
    procCache[procId] = proc

    const { sendMessage } = connect({
      to: proc,
      onMessage({ type, body }) {
        if (type === 'SUCCESS') {
          resolve(body)
        }
        if (type === 'ERROR') {
          console.error('❌ Start Error:', body)
          reject(body)
          proc.kill()
          delete procCache[procId]
        }
      },
      onExit() {
        reject()
        proc.kill()
        delete procCache[procId]
      },
    })

    sendMessage({
      type: 'START',
      body: { procId, input },
    })

    // Auto close process after 30 seconds
    setTimeout(async () => {
      proc.kill()
      delete procCache[procId]
    }, 30 * 1000)
  })
}

type Msg = string
export function solveCaptcha(procId: string, answer: string): Promise<Msg> {
  return new Promise((resolve, reject) => {
    const proc = procCache[procId]

    const { sendMessage } = connect({
      to: proc,
      onMessage({ type, body }) {
        if (type === 'SUCCESS') {
          resolve(body)
          proc.kill()
          delete procCache[procId]
        }
        if (type === 'ERROR') {
          console.error('❌ Solve Error:', body)
          reject(body)
          proc.kill()
          delete procCache[procId]
        }
      },
      onExit() {
        proc.kill()
        delete procCache[procId]
      },
    })

    sendMessage({
      type: 'SOLVE',
      body: answer,
    })
  })
}
