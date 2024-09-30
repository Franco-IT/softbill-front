import { errorProvider } from 'src/shared/providers'
import { IUserRepository } from '../repositories/IUserRepository'
import { IUpdateClientDTO } from '../dtos/IUpdateClientDTO'
import { errors } from '../errors'

export class UpdateClientUseCase {
  private userRepository: IUserRepository

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  async execute(data: IUpdateClientDTO) {
    try {
      return this.userRepository.updateClient(data)
    } catch (error: any) {
      throw errorProvider.handle(error, errors, 'Erro ao atualizar cliente, tente novamente mais tarde.')
    }
  }
}
