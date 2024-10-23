// Provider
import { errorProvider } from 'src/shared/providers'

// DTO
import { ICreateUserDTO } from '../dtos/ICreateUserDTO'

// Repository
import { IUserRepository } from '../repositories/IUserRepository'

// Errors
import { errors } from '../errors'

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: ICreateUserDTO) {
    try {
      await this.userRepository.create(data)
    } catch (error) {
      throw errorProvider.handle(error, errors, 'Erro ao criar usuário, tente novamente mais tarde.')
    }
  }
}
