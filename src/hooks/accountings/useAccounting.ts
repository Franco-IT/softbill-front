import { UseQueryOptions, useQuery } from 'react-query'
import { AppError } from 'src/shared/errors/AppError'
import { accountingsController } from 'src/modules/accounting'
import { IAccountingDTO } from 'src/modules/accounting/dtos/IAccountingDTO'

export function useAccounting(
  id: string,
  options?: UseQueryOptions<IAccountingDTO, AppError, IAccountingDTO, ['accounting', string]>
) {
  return useQuery(['accounting', id], () => accountingsController.findById({ id }), options)
}
