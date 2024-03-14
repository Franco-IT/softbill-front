import { AxiosError } from 'axios'
import { useState, useEffect, useRef } from 'react'
import { api } from 'src/services/api'

interface GetDataApiProps {
  url: string
  params?: Record<string, any>
}

const useGetDataApi = <T,>({ url, params }: GetDataApiProps) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<AxiosError | null>(null) // Fix: Removed incorrect type annotation

  const paramsRef = useRef(params)

  useEffect(() => {
    if (JSON.stringify(paramsRef.current) !== JSON.stringify(params)) {
      paramsRef.current = params

      api
        .get(url, { params: paramsRef.current })
        .then(response => {
          setData(response.data)
          setLoading(false)
        })
        .catch(error => {
          setError(error)
          setLoading(false)
        })
    }
  }, [url, params])

  useEffect(() => {
    api
      .get(url, { params: paramsRef.current })
      .then(response => {
        setData(response.data)
        setLoading(false)
      })
      .catch(error => {
        setError(error)
        setLoading(false)
      })
  }, [url])

  return { data, loading, error }
}

export default useGetDataApi
