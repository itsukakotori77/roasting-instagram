import { API_GPT4, API_INSTAGRAM, HOST_GPT4, KEY_GPT4, RAPID_HOST, RAPID_KEY } from '@/libs/constants'
import { NextResponse } from 'next/server'
import httpRequest from '@/libs/httpRequest'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username') || ''
  const fetch = httpRequest(API_INSTAGRAM)

  try {
    const res = await fetch.get('/user/details', {
      headers: {
        'x-rapidapi-host': RAPID_HOST,
        'x-rapidapi-key': RAPID_KEY,
      },
      params: {
        username,
      },
    })

    console.log(username)

    return NextResponse.json(res?.data, { status: res.status })
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.response?.data?.message },
      { status: error?.response?.status },
    )
  }
}

export async function POST(request: Request) {
  const body = await request.json()
  const fetch = httpRequest(API_GPT4)
  
  try {
    const res = await fetch.post(`/v1/chat/completions`, {
      headers: {
        'x-rapidapi-host': HOST_GPT4,
        'x-rapidapi-key': KEY_GPT4
      }
    }, body)
    
    return NextResponse.json(res?.data, { status: res.status })
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.response?.data?.message },
      { status: error?.response?.status },
    )
  }
}
