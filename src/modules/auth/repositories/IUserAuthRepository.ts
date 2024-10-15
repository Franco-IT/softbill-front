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
  changePassword(data: IChangePasswordAuthUserDTO): Promise<void>
  emailResetPassword(data: IUserEmailResetPasswordDTO): Promise<void>
  resetPassword(data: IUserResetPasswordDTO): Promise<void>
  firtsAccess(data: IUserFirstAccessDTO): Promise<void>
  getAuthUser(data: IGetAuthUserDTO): Promise<IUserLoggedDTO>
}
