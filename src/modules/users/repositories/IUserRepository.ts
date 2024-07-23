import { AxiosResponse } from 'axios'
import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { ICreateCounterDTO } from '../dtos/ICreateCounterDTO'
import { IUpdateCounterDTO } from '../dtos/IUpdateCounterDTO'
import { IDeleteUserDTO } from '../dtos/IDeleteUserDTO'
import { IChangeUserPasswordDTO } from '../dtos/IChangeUserPasswordDTO'
import { IFirstAccessUserDTO } from '../dtos/IFirstAccessUserDTO'
import { ISetUserAvatarDTO } from '../dtos/ISetUserAvatarDTO'

export interface IUserRepository {
  create(data: ICreateUserDTO | ICreateCounterDTO): Promise<AxiosResponse>
  update(data: IUpdateCounterDTO): Promise<AxiosResponse>
  delete(data: IDeleteUserDTO): Promise<AxiosResponse>
  changePassword(data: IChangeUserPasswordDTO): Promise<AxiosResponse>
  setAvatar(data: ISetUserAvatarDTO): Promise<AxiosResponse>
  firstAccess(data: IFirstAccessUserDTO): Promise<AxiosResponse>
}
