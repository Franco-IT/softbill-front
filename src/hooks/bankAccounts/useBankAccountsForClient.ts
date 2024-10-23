// DTOs
import { IGetBankAccountsByClientIdDTO } from 'src/modules/bankAccounts/dtos/IGetBankAccountsByClientIdDTO'
import { IGetBankAccountsByClientIdResponseDTO } from 'src/modules/bankAccounts/dtos/IGetBankAccountsByClientIdResponseDTO'

// React Query
import { useQuery, UseQueryOptions } from 'react-query'

// Controllers and Services
import { bankAccountsController } from 'src/modules/bankAccounts'

// Errors
import { AppError } from 'src/shared/errors/AppError'

export function useBankAccountsForClient(
  data: IGetBankAccountsByClientIdDTO,
  options?: UseQueryOptions<
    IGetBankAccountsByClientIdResponseDTO,
    AppError,
    IGetBankAccountsByClientIdResponseDTO,
    ['client-bank-accounts', IGetBankAccountsByClientIdDTO]
  >
) {
  return useQuery(['client-bank-accounts', data], () => bankAccountsController.getBankAccountsByClientId(data), options)
}
