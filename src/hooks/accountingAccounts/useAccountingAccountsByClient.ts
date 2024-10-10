// DTOs
import { IGetAccountingAccountsByClientDTO } from 'src/modules/accountingAccounts/dtos/IGetAccountingAccountsByClientDTO'
import { IGetAccountingAccountsByClientResponseDTO } from 'src/modules/accountingAccounts/dtos/IGetAccountingAccountsByClientResponseDTO'

// React Query
import { useQuery, UseQueryOptions } from 'react-query'

// Controllers
import { accountingAccountsController } from 'src/modules/accountingAccounts'

// Errors
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
    () => accountingAccountsController.getAccountingAccountsByClient(data),
    options
  )
}
