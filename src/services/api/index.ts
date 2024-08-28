import axios from 'axios'
import applyCaseMiddleware from 'axios-case-converter'

const options = {
  caseMiddleware: {
    requestInterceptor: (config: any) => {
      // Disable query string transformation
      return config
    }
  }
}

export const api = applyCaseMiddleware(
  axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-api-key': process.env.NEXT_PUBLIC_API_KEY
    }
  }),
  options
)
