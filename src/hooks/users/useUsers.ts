// DTOs
import { IGetUsersDTO } from 'src/modules/users/dtos/IGetUsersDTO'
import { IGetUsersResponseDTO } from 'src/modules/users/dtos/IGetUsersResponseDTO'

// React Query
import { useQuery, UseQueryOptions } from 'react-query'

// Error Handling
import { AppError } from 'src/shared/errors/AppError'

// Controllers
import { userController } from 'src/modules/users'

export function useUsers(
  data: IGetUsersDTO,
  options?: UseQueryOptions<IGetUsersResponseDTO, AppError, IGetUsersResponseDTO, ['users', IGetUsersDTO]>
) {
  return useQuery(['users', data], () => userController.findAll(data), options)
}
