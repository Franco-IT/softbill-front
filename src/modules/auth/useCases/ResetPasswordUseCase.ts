// Providers
import { errorProvider } from 'src/shared/providers'

// DTOs
import { IUserResetPasswordDTO } from '../dtos/IUserResetPasswordDTO'

// Repositories
import { IUserAuthRepository } from '../repositories/IUserAuthRepository'

// Errors
import { errors } from '../errors'

export class ResetPasswordUseCase {
  constructor(private userAuthRepository: IUserAuthRepository) {}

  async execute(data: IUserResetPasswordDTO) {
    try {
      await this.userAuthRepository.resetPassword(data)
    } catch (error: any) {
      throw errorProvider.handle(
        error,
        errors,
        error.response.status == 401
          ? 'Token inválido, solicite uma nova redefinição de senha.'
          : 'Erro ao redefinir a senha, solicite uma nova redefinição de senha.'
      )
    }
  }
}
