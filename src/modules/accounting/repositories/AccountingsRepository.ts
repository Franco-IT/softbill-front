// DTOs
import { IAccountingDTO } from '../dtos/IAccountingDTO'
import { ICreateAccountingDTO } from '../dtos/ICreateAccountingDTO'
import { IDeleteAccountingDTO } from '../dtos/IDeleteAccountingDTO'
import { IGetAccountingDTO } from '../dtos/IGetAccountingDTO'
import { IGetAccountingsDTO } from '../dtos/IGetAccountingsDTO'
import { IGetAccountingsResponseDTO } from '../dtos/IGetAccountingsResponseDTO'
import { IUpdateAccountingDTO } from '../dtos/IUpdateAccountingDTO'

// Repository
import { IAccountingsRepository } from './IAccountingsRepository'

// Services
import { api } from 'src/services/api'

export class AccountingsRepository implements IAccountingsRepository {
  async findByID(data: IGetAccountingDTO): Promise<IAccountingDTO> {
    const response = await api.get('users/' + data.id)

    const { data: accountant } = response.data

    return accountant
  }

  async create(data: ICreateAccountingDTO): Promise<void> {
    await api.post('users', data)
  }

  async update(data: IUpdateAccountingDTO): Promise<void> {
    await api.put('users/' + data.id, {
      email: data.email,
      name: data.name,
      status: data.status
    })
  }

  async delete(data: IDeleteAccountingDTO): Promise<void> {
    await api.delete('users/' + data.id)
  }

  async findAll(params: IGetAccountingsDTO): Promise<IGetAccountingsResponseDTO> {
    const response = await api.get('users', { params })

    return response.data
  }
}
