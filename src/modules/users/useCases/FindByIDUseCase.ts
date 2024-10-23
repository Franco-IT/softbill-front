// DTOs
import { IGetUserDTO } from '../dtos/IGetUserDTO'

// Repository
import { IUserRepository } from '../repositories/IUserRepository'

// Providers
import { errorProvider } from 'src/shared/providers'

export class FindByIDUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: IGetUserDTO) {
    try {
      return await this.userRepository.findByID(data)
    } catch (error) {
      throw errorProvider.handle(error, {}, 'Erro ao buscar usuário, tente novamente mais tarde.')
    }
  }
}
