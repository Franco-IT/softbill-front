import { AxiosError } from 'axios'
import { useState, useEffect, useRef, useCallback, useMemo } from 'react'

import { api } from 'src/services/api'
import equals from 'fast-deep-equal'

interface GetDataApiProps {
  url: string
  params?: Record<string, any>
  callInit?: boolean
}

const useGetDataApi = <T,>({ url, params, callInit = true }: GetDataApiProps) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<AxiosError | null>(null)
  const [refresh, setRefresh] = useState(false)

  const paramsRef = useRef(params)

  const handleResetData = useCallback(() => {
    setData(null)
    setError(null)
    setLoading(false)
  }, [])

  useEffect(() => {
    if (callInit) {
      if (!equals(paramsRef.current, params)) {
        paramsRef.current = params

        setLoading(true)

        api
          .get(url, { params: paramsRef.current })
          .then(response => !equals(response.data, data) && setData(response.data))
          .catch(error => setError(error))
          .finally(() => setLoading(false))
      }
    }
  }, [url, params, refresh, callInit, data])

  useEffect(() => {
    if (callInit) {
      setLoading(true)

      api
        .get(url, { params: paramsRef.current })
        .then(response => setData(response.data))
        .catch(error => setError(error))
        .finally(() => setLoading(false))
    }
  }, [url, refresh, callInit])

  return useMemo(
    () => ({ data, loading, error, refresh, setRefresh, handleResetData }),
    [data, loading, error, refresh, setRefresh, handleResetData]
  )
}

export default useGetDataApi
