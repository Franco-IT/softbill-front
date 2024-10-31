// Axios
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

// Axios Case Converter
import applyCaseMiddleware from 'axios-case-converter'

// React Hot Toast
import toast from 'react-hot-toast'

const ErrorMessages = Object.freeze({
  MISSING_AUTH: 'Authorization is missing',
  MISSING_TOKEN: 'Authorization token is missing',
  INVALID_TOKEN: 'Invalid token',
  SESSION_IN_USE: 'This session is already in use',
  INVALID_USER: 'Invalid user'
})

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

function isErrorMessage(value: string): value is (typeof ErrorMessages)[keyof typeof ErrorMessages] {
  return Object.values(ErrorMessages).includes(value as any)
}

const isCriticalError = (message?: string) => message && isErrorMessage(message)

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const { response } = error

    if (response && (response.status === 400 || response.status === 401)) {
      if (!isErrorAuthenticating) {
        const message = (response.data as { message?: string })?.message

        if (isCriticalError(message)) {
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
