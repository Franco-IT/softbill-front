import { IUserLoginDTO, IUserLoginResponseDTO } from '../dtos/IUserLoginDTO'
import { IUserLoggedDTO } from '../dtos/IUserLoggedDTO'
import { IGetAuthUserDTO } from '../dtos/IGetAuthUserDTO'
import { IUserFirstAccessDTO } from '../dtos/IUserFirstAccessDTO'
import { AxiosResponse } from 'axios'

export interface IUserAuthRepository {
  login(data: IUserLoginDTO): Promise<IUserLoginResponseDTO>
  logout(): void
  firtsAccess(data: IUserFirstAccessDTO): Promise<AxiosResponse>
  getAuthUser(data: IGetAuthUserDTO): Promise<IUserLoggedDTO>
}
