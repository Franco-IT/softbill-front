import { IGetAccountingsDTO } from 'src/modules/accounting/dtos/IGetAccountingsDTO'
import { UseQueryOptions, useQuery } from 'react-query'
import { IGetAccountingsResponseDTO } from 'src/modules/accounting/dtos/IGetAccountingsResponseDTO'
import { AppError } from 'src/shared/errors/AppError'
import { accountingsController } from 'src/modules/accounting'

export function useAccountings(
  data: IGetAccountingsDTO,
  options?: UseQueryOptions<
    IGetAccountingsResponseDTO,
    AppError,
    IGetAccountingsResponseDTO,
    ['accountings', IGetAccountingsDTO]
  >
) {
  return useQuery(['accountings', data], () => accountingsController.findAll(data), options)
}
