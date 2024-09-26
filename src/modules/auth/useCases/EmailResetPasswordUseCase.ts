import { IUserAuthRepository } from '../repositories/IUserAuthRepository'
import { IUserEmailResetPasswordDTO } from '../dtos/IUserEmailResetPasswordDTO'
import { AxiosResponse } from 'axios'
import { errorProvider } from 'src/shared/providers'

export class EmailResetPasswordUseCase {
  private userAuthRepository: IUserAuthRepository

  constructor(userAuthRepository: IUserAuthRepository) {
    this.userAuthRepository = userAuthRepository
  }

  async execute(data: IUserEmailResetPasswordDTO): Promise<AxiosResponse | void> {
    try {
      return await this.userAuthRepository.emailResetPassword(data)
    } catch (error: any) {
      throw errorProvider.handle(
        error,
        {},
        error.response.status == 409
          ? 'Usuário não encontrado, verifique o email informado.'
          : 'Erro ao enviar e-mail de recuperação de senha.'
      )
    }
  }
}
