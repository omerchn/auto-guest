import path from 'path'
import { spawn, ChildProcessWithoutNullStreams } from 'child_process'
import { v4 as uuid } from 'uuid'

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

const procCache: {
  [procId: string]: ChildProcessWithoutNullStreams
} = {}

type ProcId = string
export function createRequest(input: RequestInput): Promise<ProcId> {
  const procId = uuid()
  const procInput = JSON.stringify({ procId, input })
  const inpB64 = Buffer.from(procInput).toString('base64')

  return new Promise((resolve, reject) => {
    const proc = spawn(
      'ts-node',
      [path.resolve(__dirname, 'proc.ts'), `--input-data${inpB64}`],
      { shell: false }
    )
    procCache[procId] = proc
    proc.stdout.on('data', (data) => {
      resolve(data.toString().trim())
    })
    proc.stderr.on('data', (err) => {
      console.error('❌ Start Error:', err.toString())
      reject(err)
      proc.kill()
      delete procCache[procId]
    })
    proc.on('close', async (code) => {})
    proc.on('exit', function () {
      proc.kill()
      delete procCache[procId]
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
    proc.send(answer)
    proc.stdout.on('data', (data) => {
      resolve(data)
      proc.kill()
      delete procCache[procId]
    })
    proc.stderr.on('data', (err) => {
      console.error('❌ Solve Error:', err.toString())
      reject(err)
      proc.kill()
      delete procCache[procId]
    })
    proc.on('close', async (code) => {})
    proc.on('exit', function () {
      proc.kill()
      delete procCache[procId]
    })
  })
}
