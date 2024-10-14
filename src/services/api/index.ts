// Axios
import axios, { InternalAxiosRequestConfig } from 'axios'

// Axios Case Converter
import applyCaseMiddleware from 'axios-case-converter'

// React Hot Toast
import toast from 'react-hot-toast'

export const api = applyCaseMiddleware(
  axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      'x-api-key': process.env.NEXT_PUBLIC_API_KEY
    }
  })
)

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (config.params) {
      config.params = Object.fromEntries(
        Object.entries(config.params).filter(([, value]) => Boolean(value) || value === 0)
      )
    }

    return config
  },
  error => Promise.reject(error)
)

let isErrorAuthenticating = false

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 400 || error.response?.status === 401) {
      if (error.response?.statusText === `Unauthorized`) {
        if (!isErrorAuthenticating) {
          isErrorAuthenticating = true
          const authChannel: BroadcastChannel = new BroadcastChannel('auth')
          authChannel.postMessage('logout')
          toast.error('Sua sessão expirou, faça login novamente.')
          setTimeout(() => (isErrorAuthenticating = false), 1000)
        }
      }
    }

    return Promise.reject(error)
  }
)
