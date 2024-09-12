import { errorProvider } from 'src/shared/providers'
import { IUserRepository } from '../repositories/IUserRepository'
import { IChangeUserPasswordDTO } from '../dtos/IChangeUserPasswordDTO'

export class ChangePasswordUseCase {
  private userRepository: IUserRepository

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  async execute(data: IChangeUserPasswordDTO) {
    try {
      return this.userRepository.changePassword(data)
    } catch (error: any) {
      errorProvider.handle(error, {}, 'Erro ao alterar senha, tente novamente mais tarde.')
    }
  }
}
