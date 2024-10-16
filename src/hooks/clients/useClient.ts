// React Query for managing queries and options
import { UseQueryOptions, useQuery } from 'react-query'

// DTO representing the client data (response)
import { IClientDTO } from 'src/modules/clients/dtos/IClientDTO'

// Custom error handling class
import { AppError } from 'src/shared/errors/AppError'

// Client controller for managing client-related operations
import { clientsController } from 'src/modules/clients'

export function useClient(id: string, options?: UseQueryOptions<IClientDTO, AppError, IClientDTO, ['client', string]>) {
  return useQuery(['client', id], () => clientsController.findById({ id }), options)
}
