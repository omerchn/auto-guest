import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export const useGuestRequest = () => {
  const {
    isLoading: isStartLoading,
    data: startData,
    error: startError,
  } = useQuery({
    queryKey: ['start'],
    queryFn: async () => {
      const res = await axios.get(apiUrl + '/start')
      return res.data
    },
    staleTime: Infinity,
    retry: false,
  })

  const {
    mutate: solveCaptcha,
    isLoading: isSolveLoading,
    data: solveData,
    error: solveError,
  } = useMutation({
    mutationFn: async (answer: string) => {
      const res = await axios.post(apiUrl + '/solve', {
        id: startData.id,
        answer,
      })
      return res.data
    },
  })

  return {
    isStartLoading,
    startError,
    captchaImg: apiUrl + startData?.captchaImgPath,
    solveCaptcha,
    isSolveLoading,
    solveError,
    solveMsg: solveData?.msg,
  }
}
