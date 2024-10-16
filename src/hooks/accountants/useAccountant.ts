// React Query
import { UseQueryOptions, useQuery } from 'react-query'

// DTOs
import { IAccountantDTO } from 'src/modules/accountant/dtos/IAccountantDTO'

// Error Handling
import { AppError } from 'src/shared/errors/AppError'

// Controllers
import { accountantsController } from 'src/modules/accountant'

export function useAccountant(
  id: string,
  options?: UseQueryOptions<IAccountantDTO, AppError, IAccountantDTO, ['accountant', string]>
) {
  return useQuery(['accountant', id], () => accountantsController.findById({ id }), options)
}
