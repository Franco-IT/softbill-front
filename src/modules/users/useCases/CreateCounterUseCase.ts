import { errorProvider } from 'src/shared/providers'
import { ICreateCounterDTO } from '../dtos/ICreateCounterDTO'
import { IUserRepository } from '../repositories/IUserRepository'

export class CreateCounterUseCase {
  private userRepository: IUserRepository

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  async execute(data: ICreateCounterDTO) {
    try {
      return await this.userRepository.create(data)
    } catch (error: any) {
      errorProvider.handle(error, {}, 'Erro ao criar contador, tente novamente mais tarde.')
    }
  }
}
