// React Query
import { UseQueryOptions, useQuery } from 'react-query'

// DTOs
import { IGetAccountantsDTO } from 'src/modules/accountant/dtos/IGetAccountantsDTO'
import { IGetAccountantsResponseDTO } from 'src/modules/accountant/dtos/IGetAccountantsResponseDTO'

// Error Handling
import { AppError } from 'src/shared/errors/AppError'

// Controllers
import { accountantsController } from 'src/modules/accountant'

export function useAccountants(
  data: IGetAccountantsDTO,
  options?: UseQueryOptions<
    IGetAccountantsResponseDTO,
    AppError,
    IGetAccountantsResponseDTO,
    ['accountants', IGetAccountantsDTO]
  >
) {
  return useQuery(['accountants', data], () => accountantsController.findAll(data), options)
}
