import { useMutation } from '@tanstack/react-query'
import { apiPostGpt4 } from './api'

export function usePostGpt4<T>() {
   return useMutation<any, Error, T>({
      mutationKey: ['GPT4-Post'],
      mutationFn: (body: T) => apiPostGpt4(body as any)
   })
}
