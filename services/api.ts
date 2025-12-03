import axios from 'axios'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

const api = axios.create({
  baseURL: process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL,
})

api.defaults.headers.common['Content-Type'] = 'application/json'
api.defaults.headers.common['Accept'] = 'application/json'

api.interceptors.request.use((config) => {
  config.headers = config.headers ?? {}
  if (!config.headers['Content-Type']) config.headers['Content-Type'] = 'application/json'
  if (!config.headers['Accept']) config.headers['Accept'] = 'application/json'
  return config
})

export function setAuthToken(token: string | null) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete api.defaults.headers.common['Authorization']
  }
}

export async function apiServer() {
  const session = await getServerSession(authOptions)
  const instance = axios.create({
    baseURL: process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL,
  })
  instance.defaults.headers.common['Content-Type'] = 'application/json'
  instance.defaults.headers.common['Accept'] = 'application/json'
  const token = (session as any)?.accessToken as string | undefined
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
  return instance
}

export default api
