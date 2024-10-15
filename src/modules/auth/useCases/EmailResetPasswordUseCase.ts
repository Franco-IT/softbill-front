// Repositories
import { IUserAuthRepository } from '../repositories/IUserAuthRepository'

// DTOs
import { IUserEmailResetPasswordDTO } from '../dtos/IUserEmailResetPasswordDTO'

// Providers
import { errorProvider } from 'src/shared/providers'

// Errors
import { errors } from '../erros'

export class EmailResetPasswordUseCase {
  constructor(private userAuthRepository: IUserAuthRepository) {}

  async execute(data: IUserEmailResetPasswordDTO) {
    try {
      await this.userAuthRepository.emailResetPassword(data)
    } catch (error: any) {
      throw errorProvider.handle(
        error,
        errors,
        error.response.status == 409
          ? 'Usuário não encontrado, verifique o email informado e tente novamente.'
          : 'Erro ao enviar e-mail de recuperação de senha, tente novamente mais tarde.'
      )
    }
  }
}
