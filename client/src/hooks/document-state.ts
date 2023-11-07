import { useEffect } from 'react'
import { Student } from '../components/StudentModal/types'
import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export type DocumentValues = Partial<Student>

export type DocumentState = {
  viewState?: string
  eventValidation?: string
  values?: DocumentValues
}

const mainDocumentStateAtom = atomWithStorage<DocumentState | undefined>(
  'main-document-state',
  undefined
)

const subDocumentStateAtom = atomWithStorage<DocumentState | undefined>(
  'sub-document-state',
  undefined
)

export const useDocumentState = () => {
  const [mainDocumentState, setMainDocumentState] = useAtom(
    mainDocumentStateAtom
  )
  const [subDocumentState, setSubDocumentState] = useAtom(subDocumentStateAtom)

  const resetSubToMain = () => {
    setSubDocumentState(mainDocumentState)
  }

  const mergeSubToMain = () => {
    setMainDocumentState(subDocumentState)
  }

  useEffect(() => {
    resetSubToMain()
  }, [mainDocumentState])

  return {
    mainDocumentState,
    subDocumentState,
    setSubDocumentState,
    resetSubToMain,
    mergeSubToMain,
  }
}
