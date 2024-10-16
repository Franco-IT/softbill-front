// Providers
import { errorProvider } from 'src/shared/providers'

// DTOs
import { IGetUsersDTO } from '../dtos/IGetUsersDTO'

// Repositories
import { IUserRepository } from '../repositories/IUserRepository'

export class GetUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(params: IGetUsersDTO) {
    try {
      return await this.userRepository.findAll(params)
    } catch (error) {
      throw errorProvider.handle(error, {}, 'Erro ao buscar usuários, tente novamente mais tarde.')
    }
  }
}
