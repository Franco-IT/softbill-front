import { AxiosResponse } from 'axios'
import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { ICreateCounterDTO } from '../dtos/ICreateCounterDTO'
import { IUpdateCounterDTO } from '../dtos/IUpdateCounterDTO'
import { IDeleteUserDTO } from '../dtos/IDeleteUserDTO'
import { IChangeUserPasswordDTO } from '../dtos/IChangeUserPasswordDTO'
import { IFirstAccessUserDTO } from '../dtos/IFirstAccessUserDTO'

export interface IUserRepository {
  create(data: ICreateUserDTO | ICreateCounterDTO): Promise<AxiosResponse>
  update(data: IUpdateCounterDTO): Promise<AxiosResponse>
  delete(data: IDeleteUserDTO): Promise<AxiosResponse>
  changePassword(data: IChangeUserPasswordDTO): Promise<AxiosResponse>
  firstAccess(data: IFirstAccessUserDTO): Promise<AxiosResponse>
}
