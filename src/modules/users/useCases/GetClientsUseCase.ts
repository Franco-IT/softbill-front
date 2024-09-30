import { errorProvider } from 'src/shared/providers'
import { IGetClientsDTO } from '../dtos/IGetClientsDTO'
import { IUserRepository } from '../repositories/IUserRepository'

export class GetClientsUseCase {
  private userRepository: IUserRepository

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  async execute(params: IGetClientsDTO) {
    try {
      const response = await this.userRepository.getClients(params)

      return response.data
    } catch (error: any) {
      throw errorProvider.handle(error, {}, 'Erro ao buscar clientes, tente novamente mais tarde.')
    }
  }
}
