import { errorProvider } from 'src/shared/providers'
import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { IUserRepository } from '../repositories/IUserRepository'

export class CreateUserUseCase {
  private userRepository: IUserRepository

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  async execute(data: ICreateUserDTO) {
    try {
      return await this.userRepository.create(data)
    } catch (error: any) {
      errorProvider.handle(error, {}, 'Erro ao criar usuário, tente novamente mais tarde.')
    }
  }
}
