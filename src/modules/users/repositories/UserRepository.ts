import { AxiosResponse } from 'axios'
import { api } from 'src/services/api'
import { IUserRepository } from './IUserRepository'
import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { IDeleteUserDTO } from '../dtos/IDeleteUserDTO'
import { ICreateCounterDTO } from '../dtos/ICreateCounterDTO'
import { IUpdateCounterDTO } from '../dtos/IUpdateCounterDTO'
import { IChangeUserPasswordDTO } from '../dtos/IChangeUserPasswordDTO'
import { IFirstAccessUserDTO } from '../dtos/IFirstAccessUserDTO'
import { ISetUserAvatarDTO } from '../dtos/ISetUserAvatarDTO'
import { IGetUserDTO } from '../dtos/IGetUserDTO'
import { IGetUsersDTO } from '../dtos/IGetUsersDTO'
import { IGetClientsDTO } from '../dtos/IGetClientsDTO'
import { ICreateClientDTO } from '../dtos/ICreateClientDTO'
import { IUpdateClientDTO } from '../dtos/IUpdateClientDTO'

export class UserRepository implements IUserRepository {
  async getUsers(params: IGetUsersDTO): Promise<AxiosResponse> {
    return api.get('/users', { params })
  }

  async getClients(params: IGetClientsDTO): Promise<AxiosResponse> {
    return api.get('/users', { params })
  }

  async findByID(data: IGetUserDTO): Promise<AxiosResponse<any, any>> {
    return api.get(`/users/${data.id}`)
  }

  async create(data: ICreateUserDTO | ICreateCounterDTO): Promise<AxiosResponse<any, any>> {
    return api.post('/users', data)
  }

  async createClient(data: ICreateClientDTO): Promise<AxiosResponse> {
    return api.post('/users', data)
  }

  async updateClient(data: IUpdateClientDTO): Promise<AxiosResponse> {
    return api.put(`/users/${data.id}`, data)
  }

  async update(data: IUpdateCounterDTO): Promise<AxiosResponse<any, any>> {
    return api.put(`/users/${data.id}`, data)
  }

  async delete(data: IDeleteUserDTO): Promise<AxiosResponse<any, any>> {
    return api.delete(`/users/${data.id}`)
  }

  async changePassword({ id, newPassword, confirmPassword }: IChangeUserPasswordDTO): Promise<AxiosResponse<any, any>> {
    return api.put(`/auth/change-auth-password/${id}`, {
      newPassword,
      confirmPassword
    })
  }

  async setAvatar(data: ISetUserAvatarDTO): Promise<AxiosResponse<any, any>> {
    return api.post('/files', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  async firstAccess({ id }: IFirstAccessUserDTO): Promise<AxiosResponse<any, any>> {
    return api.get(`/users/first-access/${id}`)
  }
}
