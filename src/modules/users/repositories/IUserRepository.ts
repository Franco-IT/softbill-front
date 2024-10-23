// Axios
import { AxiosResponse } from 'axios'

// DTOs
import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { IUpdateUserDTO } from '../dtos/IUpdateUserDTO'
import { IDeleteUserDTO } from '../dtos/IDeleteUserDTO'
import { IChangeUserPasswordDTO } from '../dtos/IChangeUserPasswordDTO'
import { IFirstAccessUserDTO } from '../dtos/IFirstAccessUserDTO'
import { ISetUserAvatarDTO } from '../dtos/ISetUserAvatarDTO'
import { IGetUserDTO } from '../dtos/IGetUserDTO'
import { IGetUsersDTO } from '../dtos/IGetUsersDTO'
import { IGetUsersResponseDTO } from '../dtos/IGetUsersResponseDTO'
import { IUserDTO } from '../dtos/IUserDTO'

export interface IUserRepository {
  findByID(data: IGetUserDTO): Promise<IUserDTO>
  findAll(params: IGetUsersDTO): Promise<IGetUsersResponseDTO>
  create(data: ICreateUserDTO): Promise<void>
  update(data: IUpdateUserDTO): Promise<void>
  delete(data: IDeleteUserDTO): Promise<void>
  changePassword(data: IChangeUserPasswordDTO): Promise<void>
  setAvatar(data: ISetUserAvatarDTO): Promise<void>
  firstAccess(data: IFirstAccessUserDTO): Promise<AxiosResponse>
}
