import { LoginUseCase } from '../useCases/LoginUseCase'
import { LogoutUseCase } from '../useCases/LogoutUseCase'
import { IUserLoginDTO } from '../dtos/IUserLoginDTO'
import { GetAuthUserUseCase } from '../useCases/GetAuthUserUseCase'
import { FirstAccessUseCase } from '../useCases/FirstAccessUseCase'
import { IUserFirstAccessDTO } from '../dtos/IUserFirstAccessDTO'

export class AuthController {
  private loginUseCase: LoginUseCase
  private logoutUseCase: LogoutUseCase
  private getAuthUserUseCase: GetAuthUserUseCase
  private firstAccessUseCase: FirstAccessUseCase

  constructor(
    loginUseCase: LoginUseCase,
    logoutUseCase: LogoutUseCase,
    getAuthUserUseCase: GetAuthUserUseCase,
    firstAccessUseCase: FirstAccessUseCase
  ) {
    this.loginUseCase = loginUseCase
    this.logoutUseCase = logoutUseCase
    this.getAuthUserUseCase = getAuthUserUseCase
    this.firstAccessUseCase = firstAccessUseCase
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
}
