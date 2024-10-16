// Repository
import { IUserRepository } from '../repositories/IUserRepository'

// DTO
import { IChangeUserPasswordDTO } from '../dtos/IChangeUserPasswordDTO'

// Providers
import { errorProvider } from 'src/shared/providers'

export class ChangePasswordUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: IChangeUserPasswordDTO) {
    try {
      await this.userRepository.changePassword(data)
    } catch (error) {
      throw errorProvider.handle(error, {}, 'Erro ao alterar senha, tente novamente mais tarde.')
    }
  }
}
