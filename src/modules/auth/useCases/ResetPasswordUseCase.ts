import { AxiosResponse } from 'axios'
import { errorProvider } from 'src/shared/providers'
import { IUserResetPasswordDTO } from '../dtos/IUserResetPasswordDTO'
import { IUserAuthRepository } from '../repositories/IUserAuthRepository'

export class ResetPasswordUseCase {
  private userAuthRepository: IUserAuthRepository

  constructor(userAuthRepository: IUserAuthRepository) {
    this.userAuthRepository = userAuthRepository
  }

  async execute(data: IUserResetPasswordDTO): Promise<AxiosResponse | void> {
    try {
      return await this.userAuthRepository.resetPassword(data)
    } catch (error: any) {
      throw errorProvider.handle(
        error,
        {},
        error.response.status == 401
          ? 'Token inválido, solicite uma nova redefinição de senha.'
          : 'Erro ao redefinir a senha, solicite uma nova redefinição de senha.'
      )
    }
  }
}
