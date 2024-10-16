// React Query for managing queries and options
import { UseQueryOptions, useQuery } from 'react-query'

// DTO for getting client details (request)
import { IGetClientsDTO } from 'src/modules/clients/dtos/IGetClientsDTO'

// DTO for client response data (response)
import { IGetClientsResponseDTO } from 'src/modules/clients/dtos/IGetClientsResponseDTO'

// Custom error handling class
import { AppError } from 'src/shared/errors/AppError'

// Client controller for managing client-related operations
import { clientsController } from 'src/modules/clients'

export function useClients(
  data: IGetClientsDTO,
  options?: UseQueryOptions<IGetClientsResponseDTO, AppError, IGetClientsResponseDTO, ['clients', IGetClientsDTO]>
) {
  return useQuery(['clients', data], () => clientsController.findAll(data), options)
}
