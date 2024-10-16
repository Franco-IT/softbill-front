// DTOs
import { IAccountantDTO } from '../dtos/IAccountantDTO'
import { ICreateAccountantDTO } from '../dtos/ICreateAccountantDTO'
import { IDeleteAccountantDTO } from '../dtos/IDeleteAccountantDTO'
import { IGetAccountantDTO } from '../dtos/IGetAccountantDTO'
import { IGetAccountantsDTO } from '../dtos/IGetAccountantsDTO'
import { IGetAccountantsResponseDTO } from '../dtos/IGetAccountantsResponseDTO'
import { IUpdateAccountantDTO } from '../dtos/IUpdateAccountantDTO'

// Repository
import { IAccountantsRepository } from './IAccountantsRepository'

// Services
import { api } from 'src/services/api'

export class AccountantsRepository implements IAccountantsRepository {
  async findByID(data: IGetAccountantDTO): Promise<IAccountantDTO> {
    const response = await api.get('users/' + data.id)

    const { data: accountant } = response.data

    return accountant
  }

  async create(data: ICreateAccountantDTO): Promise<void> {
    await api.post('users', data)
  }

  async update(data: IUpdateAccountantDTO): Promise<void> {
    await api.put('users/' + data.id, {
      email: data.email,
      name: data.name,
      status: data.status
    })
  }

  async delete(data: IDeleteAccountantDTO): Promise<void> {
    await api.delete('users/' + data.id)
  }

  async findAll(params: IGetAccountantsDTO): Promise<IGetAccountantsResponseDTO> {
    const response = await api.get('users', { params })

    return response.data
  }
}
