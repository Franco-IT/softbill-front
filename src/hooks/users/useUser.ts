// DTOs
import { IUserDTO } from 'src/modules/users/dtos/IUserDTO'

// React Query
import { useQuery, UseQueryOptions } from 'react-query'

// Error Handling
import { AppError } from 'src/shared/errors/AppError'

// Controllers
import { userController } from 'src/modules/users'

export function useUser(id: string, options?: UseQueryOptions<IUserDTO, AppError, IUserDTO, ['user', string]>) {
  return useQuery(['user', id], () => userController.findByID({ id }), options)
}
