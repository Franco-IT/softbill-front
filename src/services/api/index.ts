import axios from 'axios'
import applyCaseMiddleware from 'axios-case-converter'

export const api = applyCaseMiddleware(
  axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-api-key': process.env.NEXT_PUBLIC_API_KEY
    }
  })
)
