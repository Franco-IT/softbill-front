import { api } from 'src/services/api'
import { errorProvider } from '../../shared/providers'
import { UseQueryOptions, useQuery } from 'react-query'
import { AppError } from '../../shared/errors/AppError'

export async function getClientDashboard() {
  try {
    const response = await api.get('monthlyFinancialCloses/dashboard-client')

    return response.data
  } catch (e) {
    throw errorProvider.handle(e, {}, 'Erro ao buscar dados do dashbaord, tente novamente mais tarde.')
  }
}

export function useClientDashboard(options?: UseQueryOptions<any, AppError, any, ['client-dashboard']>) {
  return useQuery(['client-dashboard'], () => getClientDashboard(), options)
}
