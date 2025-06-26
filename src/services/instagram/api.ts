import { BASE_URL } from '@/libs/constants'
import httpRequest from '@/libs/httpRequest'

const api = httpRequest(BASE_URL)

export async function apiGetProfileInstagram(username: string) {
  const { data } = await api.get<any, any>('/api/v1/roast', {
    params: {
      username,
    },
  })

  return data
}
