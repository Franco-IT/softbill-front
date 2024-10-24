import { useQueryClient } from 'react-query'

type QueryKey = (string | object)[]

const useGetFetchQuery = <T = unknown,>(queryKey: QueryKey): T | undefined => {
  const queryClient = useQueryClient()

  return queryClient.getQueryData<T>(queryKey)
}

export default useGetFetchQuery
