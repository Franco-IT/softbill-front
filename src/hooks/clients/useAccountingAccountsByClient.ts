import { IGetAccountingAccountsByClientDTO } from 'src/modules/clients/dtos/IGetAccountingAccountsByClientDTO'
import { useQuery, UseQueryOptions } from 'react-query'
import { IGetAccountingAccountsByClientResponseDTO } from 'src/modules/clients/dtos/IGetAccountingAccountsByClientResponseDTO'
import { clientsController } from 'src/modules/clients'
import { AppError } from 'src/shared/errors/AppError'

export function useAccountingAccountsByClient(
  data: IGetAccountingAccountsByClientDTO,
  options?: UseQueryOptions<
    IGetAccountingAccountsByClientResponseDTO,
    AppError,
    IGetAccountingAccountsByClientResponseDTO,
    ['accounting-accounts-by-client', IGetAccountingAccountsByClientDTO]
  >
) {
  return useQuery(
    ['accounting-accounts-by-client', data],
    () => clientsController.getAccountingAccountsByClient(data),
    options
  )
}
