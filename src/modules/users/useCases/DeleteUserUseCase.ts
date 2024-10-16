// DTOs
import { IDeleteUserDTO } from '../dtos/IDeleteUserDTO'

// Repository
import { IUserRepository } from '../repositories/IUserRepository'

// Providers
import { errorProvider } from 'src/shared/providers'

export class DeleteUserUseCase {
  constructor(private usersRepository: IUserRepository) {}

  async execute(data: IDeleteUserDTO) {
    try {
      await this.usersRepository.delete(data)
    } catch (error) {
      throw errorProvider.handle(error, {}, 'Erro ao deletar usuário, tente novamente mais tarde.')
    }
  }
}
