import { errorProvider } from 'src/shared/providers'
import { IUpdateCounterDTO } from '../dtos/IUpdateCounterDTO'
import { IUserRepository } from '../repositories/IUserRepository'

export class UpdateCounterUseCase {
  private userRepository: IUserRepository

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  async execute(data: IUpdateCounterDTO) {
    try {
      return this.userRepository.update(data)
    } catch (error: any) {
      throw errorProvider.handle(error, {}, 'Erro ao atualizar contador, tente novamente mais tarde.')
    }
  }
}
