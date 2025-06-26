import { BASE_URL } from '@/libs/constants'
import httpRequest from '@/libs/httpRequest'

const api = httpRequest(BASE_URL)

export async function apiPostGpt4(body: any) {
  const { data } = await api.post<any, any>('/api/v1/roast', body)

  return data
}
