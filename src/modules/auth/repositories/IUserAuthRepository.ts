import { AxiosResponse } from 'axios'
import { IUserLoggedDTO } from '../dtos/IUserLoggedDTO'
import { IGetAuthUserDTO } from '../dtos/IGetAuthUserDTO'
import { IUserFirstAccessDTO } from '../dtos/IUserFirstAccessDTO'
import { IUserResetPasswordDTO } from '../dtos/IUserResetPasswordDTO'
import { IUserLoginDTO, IUserLoginResponseDTO } from '../dtos/IUserLoginDTO'
import { IUserEmailResetPasswordDTO } from '../dtos/IUserEmailResetPasswordDTO'
import { IChangePasswordAuthUserDTO } from '../dtos/IChangePasswordAuthUserDTO'

export interface IUserAuthRepository {
  login(data: IUserLoginDTO): Promise<IUserLoginResponseDTO>
  logout(): void
  changePassword(data: IChangePasswordAuthUserDTO): Promise<AxiosResponse>
  emailResetPassword(data: IUserEmailResetPasswordDTO): Promise<AxiosResponse>
  resetPassword(data: IUserResetPasswordDTO): Promise<AxiosResponse>
  firtsAccess(data: IUserFirstAccessDTO): Promise<AxiosResponse>
  getAuthUser(data: IGetAuthUserDTO): Promise<IUserLoggedDTO>
}
