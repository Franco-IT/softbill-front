// DTOs
import { IGetBanksByClientIdDTO } from 'src/modules/banks/dtos/IGetBanksByClientIdDTO'

// React Query
import { useQuery, UseQueryOptions } from 'react-query'

// Controllers and Services
import { bankController } from 'src/modules/banks'

// Errors
import { AppError } from 'src/shared/errors/AppError'

export function useClientBanks(
  data: IGetBanksByClientIdDTO,
  options?: UseQueryOptions<IGetBanksByClientIdDTO, AppError, any, ['client-banks', IGetBanksByClientIdDTO]>
) {
  return useQuery(['client-banks', data], () => bankController.getBanksByClientId(data), options)
}
