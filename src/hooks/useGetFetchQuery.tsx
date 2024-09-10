import { useQueryClient } from 'react-query'

const useGetFetchQuery = <T = unknown,>(queryKey: string): T | undefined => {
  const queryClient = useQueryClient()

  return queryClient.getQueryData<T>([queryKey])
}

export default useGetFetchQuery
