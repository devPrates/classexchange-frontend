import axios from 'axios'

const api = axios.create({
  baseURL: process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL,
})

export function setAuthToken(token: string | null) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete api.defaults.headers.common['Authorization']
  }
}

export default api
