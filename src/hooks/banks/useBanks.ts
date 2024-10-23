// React Query
import { useQuery, UseQueryOptions } from 'react-query'

// DTOs
import { IGetBanksDTO } from 'src/modules/banks/dtos/IGetBanksDTO'
import { IGetBanksResponseDTO } from 'src/modules/banks/dtos/IGetBanksResponseDTO'

// Controller
import { bankController } from 'src/modules/banks'

// Errors
import { AppError } from 'src/shared/errors/AppError'

export function useBanks(
  data: IGetBanksDTO,
  options?: UseQueryOptions<IGetBanksResponseDTO, AppError, IGetBanksResponseDTO, ['banks', IGetBanksDTO]>
) {
  return useQuery(['banks', data], () => bankController.getBanks(data), options)
}
