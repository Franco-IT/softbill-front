import { LoginUseCase } from '../useCases/LoginUseCase'
import { LogoutUseCase } from '../useCases/LogoutUseCase'
import { IUserLoginDTO } from '../dtos/IUserLoginDTO'
import { GetAuthUserUseCase } from '../useCases/GetAuthUserUseCase'
import { FirstAccessUseCase } from '../useCases/FirstAccessUseCase'
import { IUserFirstAccessDTO } from '../dtos/IUserFirstAccessDTO'
import { EmailResetPasswordUseCase } from '../useCases/EmailResetPasswordUseCase'
import { ResetPasswordUseCase } from '../useCases/ResetPasswordUseCase'
import { ChangePasswordUseCase } from '../useCases/ChangePasswordUseCase'
import { IChangePasswordAuthUserDTO } from '../dtos/IChangePasswordAuthUserDTO'

export class AuthController {
  constructor(
    private loginUseCase: LoginUseCase,
    private logoutUseCase: LogoutUseCase,
    private getAuthUserUseCase: GetAuthUserUseCase,
    private changePasswordUseCase: ChangePasswordUseCase,
    private firstAccessUseCase: FirstAccessUseCase,
    private resetPasswordUseCase: ResetPasswordUseCase,
    private emailResetPasswordUseCase: EmailResetPasswordUseCase
  ) {}

  async login(data: IUserLoginDTO) {
    return this.loginUseCase.execute(data)
  }

  logout() {
    return this.logoutUseCase.execute()
  }

  async getAuthUser(id: string) {
    return this.getAuthUserUseCase.execute(id)
  }

  async changePassword(data: IChangePasswordAuthUserDTO) {
    return this.changePasswordUseCase.execute(data)
  }

  async firstAccess(data: IUserFirstAccessDTO) {
    return this.firstAccessUseCase.execute(data)
  }

  async resetPassword(data: any) {
    return this.resetPasswordUseCase.execute(data)
  }

  async emailResetPassword(data: any) {
    return this.emailResetPasswordUseCase.execute(data)
  }
}
