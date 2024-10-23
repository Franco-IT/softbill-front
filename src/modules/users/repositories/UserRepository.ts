// Axios
import { AxiosResponse } from 'axios'

// API
import { api } from 'src/services/api'

// Repository
import { IUserRepository } from './IUserRepository'

// DTOs
import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { IDeleteUserDTO } from '../dtos/IDeleteUserDTO'
import { IUpdateUserDTO } from '../dtos/IUpdateUserDTO'
import { IChangeUserPasswordDTO } from '../dtos/IChangeUserPasswordDTO'
import { IFirstAccessUserDTO } from '../dtos/IFirstAccessUserDTO'
import { ISetUserAvatarDTO } from '../dtos/ISetUserAvatarDTO'
import { IGetUserDTO } from '../dtos/IGetUserDTO'
import { IGetUsersDTO } from '../dtos/IGetUsersDTO'
import { IGetUsersResponseDTO } from '../dtos/IGetUsersResponseDTO'
import { IUserDTO } from '../dtos/IUserDTO'
import { IGetClientsDTO } from '../dtos/IGetClientsDTO'
import { ICreateClientDTO } from '../dtos/ICreateClientDTO'
import { IUpdateClientDTO } from '../dtos/IUpdateClientDTO'

export class UserRepository implements IUserRepository {
  async findAll(params: IGetUsersDTO): Promise<IGetUsersResponseDTO> {
    const response = await api.get('users', { params })

    return response.data
  }

  async getClients(params: IGetClientsDTO): Promise<AxiosResponse> {
    return api.get('users', { params })
  }

  async findByID(data: IGetUserDTO): Promise<IUserDTO> {
    const response = await api.get(`users/${data.id}`)
    const { data: user } = response.data

    return user
  }

  async create(data: ICreateUserDTO): Promise<void> {
    await api.post('users', data)
  }

  async createClient(data: ICreateClientDTO): Promise<void> {
    await api.post('users', data)
  }

  async updateClient(data: IUpdateClientDTO): Promise<void> {
    await api.put(`/users/${data.id}`, data)
  }

  async update(data: IUpdateUserDTO): Promise<void> {
    await api.put(`users/${data.id}`, {
      email: data.email,
      name: data.name,
      status: data.status
    })
  }

  async delete(data: IDeleteUserDTO): Promise<void> {
    await api.delete(`users/${data.id}`)
  }

  async changePassword({ id, newPassword, confirmPassword }: IChangeUserPasswordDTO): Promise<void> {
    await api.put(`auth/change-auth-password/${id}`, {
      newPassword,
      confirmPassword
    })
  }

  async setAvatar(data: ISetUserAvatarDTO): Promise<void> {
    return api.post('files', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  async firstAccess({ id }: IFirstAccessUserDTO): Promise<AxiosResponse<any, any>> {
    return api.get(`users/first-access/${id}`)
  }
}
