import {
   useMutation,
 } from '@tanstack/react-query'
import { apiGetProfileInstagram } from './api'

export function useGetUsername<T>() {
   return useMutation<any, Error, T>({
      mutationKey: ['Username-Get'],
      mutationFn: (username: T) => apiGetProfileInstagram(username as string)
   })
}
