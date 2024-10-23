// DTOs
import { IClientDTO } from '../dtos/IClientDTO'
import { ICreateClientDTO } from '../dtos/ICreateClientDTO'
import { IDeleteClientDTO } from '../dtos/IDeleteClientDTO'
import { IGetClientDTO } from '../dtos/IGetClientDTO'
import { IGetClientsDTO } from '../dtos/IGetClientsDTO'
import { IGetClientsResponseDTO } from '../dtos/IGetClientsResponseDTO'
import { IUpdateClientDTO } from '../dtos/IUpdateClientDTO'

// Repository
import { IClientsRepository } from './IClientsRepository'

// Services
import { api } from 'src/services/api'

export class ClientsRepository implements IClientsRepository {
  async findByID(data: IGetClientDTO): Promise<IClientDTO> {
    const response = await api.get('users/' + data.id)

    const { data: accountant } = response.data

    return accountant
  }

  async create(data: ICreateClientDTO): Promise<void> {
    await api.post('users', data)
  }

  async update(data: IUpdateClientDTO): Promise<void> {
    await api.put('users/' + data.id, data)
  }

  async delete(data: IDeleteClientDTO): Promise<void> {
    await api.delete('users/' + data.id)
  }

  async findAll(params: IGetClientsDTO): Promise<IGetClientsResponseDTO> {
    const response = await api.get('users', { params })

    return response.data
  }
}
