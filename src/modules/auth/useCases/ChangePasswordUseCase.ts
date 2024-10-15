// Providers
import { errorProvider } from 'src/shared/providers'

// DTOs
import { IChangePasswordAuthUserDTO } from '../dtos/IChangePasswordAuthUserDTO'

// Repositories
import { IUserAuthRepository } from '../repositories/IUserAuthRepository'

// Errors
import { errors } from '../errors'

export class ChangePasswordUseCase {
  constructor(private userAuthRepository: IUserAuthRepository) {}

  async execute(data: IChangePasswordAuthUserDTO) {
    try {
      await this.userAuthRepository.changePassword(data)
    } catch (error) {
      throw errorProvider.handle(error, errors, 'Ocorreu um erro ao alterar a senha, tente novamente mais tarde.')
    }
  }
}
