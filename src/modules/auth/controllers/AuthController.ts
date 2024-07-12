import { LoginUseCase } from '../useCases/LoginUseCase'
import { LogoutUseCase } from '../useCases/LogoutUseCase'
import { IUserLoginDTO } from '../dtos/IUserLoginDTO'
import { GetAuthUserUseCase } from '../useCases/GetAuthUserUseCase'
import { FirstAccessUseCase } from '../useCases/FirstAccessUseCase'
import { IUserFirstAccessDTO } from '../dtos/IUserFirstAccessDTO'
import { EmailResetPasswordUseCase } from '../useCases/EmailResetPasswordUseCase'
import { ResetPasswordUseCase } from '../useCases/ResetPasswordUseCase'

export class AuthController {
  private loginUseCase: LoginUseCase
  private logoutUseCase: LogoutUseCase
  private getAuthUserUseCase: GetAuthUserUseCase
  private firstAccessUseCase: FirstAccessUseCase
  private resetPasswordUseCase: ResetPasswordUseCase
  private emailResetPasswordUseCase: EmailResetPasswordUseCase

  constructor(
    loginUseCase: LoginUseCase,
    logoutUseCase: LogoutUseCase,
    getAuthUserUseCase: GetAuthUserUseCase,
    firstAccessUseCase: FirstAccessUseCase,
    resetPasswordUseCase: ResetPasswordUseCase,
    emailResetPasswordUseCase: EmailResetPasswordUseCase
  ) {
    this.loginUseCase = loginUseCase
    this.logoutUseCase = logoutUseCase
    this.getAuthUserUseCase = getAuthUserUseCase
    this.firstAccessUseCase = firstAccessUseCase
    this.resetPasswordUseCase = resetPasswordUseCase
    this.emailResetPasswordUseCase = emailResetPasswordUseCase
  }

  async login(data: IUserLoginDTO) {
    return await this.loginUseCase.execute(data)
  }

  logout() {
    this.logoutUseCase.execute()
  }

  async getAuthUser(id: string) {
    return await this.getAuthUserUseCase.execute(id)
  }

  async firstAccess(data: IUserFirstAccessDTO) {
    return await this.firstAccessUseCase.execute(data)
  }

  async resetPassword(data: any) {
    return await this.resetPasswordUseCase.execute(data)
  }

  async emailResetPassword(data: any) {
    return await this.emailResetPasswordUseCase.execute(data)
  }
}
