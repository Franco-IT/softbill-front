import { LoginUseCase } from '../useCases/LoginUseCase'
import { LogoutUseCase } from '../useCases/LogoutUseCase'
import { IUserLoginDTO } from '../dtos/IUserLoginDTO'
import { GetAuthUserUseCase } from '../useCases/GetAuthUserUseCase'

export class AuthController {
  private loginUseCase: LoginUseCase
  private logoutUseCase: LogoutUseCase
  private getAuthUserUseCase: GetAuthUserUseCase

  constructor(loginUseCase: LoginUseCase, logoutUseCase: LogoutUseCase, getAuthUserUseCase: GetAuthUserUseCase) {
    this.loginUseCase = loginUseCase
    this.logoutUseCase = logoutUseCase
    this.getAuthUserUseCase = getAuthUserUseCase
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
}
