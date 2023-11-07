import { trpc } from '../lib/trpc'
import { DocumentValues, useDocumentState } from './document-state'
import { useRef } from 'react'

export const useStudentOptions = () => {
  const { subDocumentState, setSubDocumentState } = useDocumentState()
  const successData = useRef(subDocumentState)

  const { data, isFetching, remove } = trpc.options.useQuery(
    subDocumentState ?? {},
    {
      onSuccess: (data) => {
        successData.current = data
      },
      staleTime: 0,
      refetchOnWindowFocus: false,
      cacheTime: 0,
      keepPreviousData: true,
    }
  )

  const setValues = (values: DocumentValues) => {
    setSubDocumentState((old) => ({
      ...old,
      ...successData.current,
      values: { ...old?.values, ...values },
    }))
  }

  return {
    options: data?.options,
    isFetching,
    setValues,
    resetOptions: remove,
  }
}
