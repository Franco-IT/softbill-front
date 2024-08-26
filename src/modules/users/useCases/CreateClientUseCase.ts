import { errorProvider } from 'src/shared/providers'
import { ICreateClientDTO } from '../dtos/ICreateClientDTO'
import { IUserRepository } from '../repositories/IUserRepository'

export class CreateClientUseCase {
  private userRepository: IUserRepository

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  async execute(data: ICreateClientDTO) {
    try {
      const response = await this.userRepository.createClient(data)

      return response.data
    } catch (error: any) {
      errorProvider.handle(error, {}, 'Erro ao criar cliente, tente novamente mais tarde.')
    }
  }
}
