// DTOs
import { IGetClientDTO } from '../dtos/IGetClientDTO'

// Repository
import { IClientsRepository } from '../repositories/IClientsRepository'

// Provider
import { errorProvider } from 'src/shared/providers'

export class GetClientUseCase {
  constructor(private clientsRepository: IClientsRepository) {}

  async execute(data: IGetClientDTO) {
    try {
      return await this.clientsRepository.findByID(data)
    } catch (e) {
      throw errorProvider.handle(e, {}, 'Erro ao buscar cliente, tente novamente mais tarde.')
    }
  }
}
