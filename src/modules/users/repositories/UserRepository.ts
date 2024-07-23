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

export class UserRepository implements IUserRepository {
  async create(data: ICreateUserDTO | ICreateCounterDTO): Promise<AxiosResponse<any, any>> {
    return await api.post('/users', data)
  }

  async update(data: IUpdateCounterDTO): Promise<AxiosResponse<any, any>> {
    return await api.put(`/users/${data.id}`, data)
  }

  async delete(data: IDeleteUserDTO): Promise<AxiosResponse<any, any>> {
    return await api.delete(`/users/${data.id}`)
  }

  async changePassword({ id, newPassword, confirmPassword }: IChangeUserPasswordDTO): Promise<AxiosResponse<any, any>> {
    return await api.put(`/auth/change-auth-password/${id}`, {
      newPassword,
      confirmPassword
    })
  }

  async setAvatar(data: ISetUserAvatarDTO): Promise<AxiosResponse<any, any>> {
    return await api.post('/files', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  async firstAccess({ id }: IFirstAccessUserDTO): Promise<AxiosResponse<any, any>> {
    return await api.get(`/users/first-access/${id}`)
  }
}
