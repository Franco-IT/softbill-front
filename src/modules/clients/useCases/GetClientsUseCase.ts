// DTOs
import { IGetClientsDTO } from '../dtos/IGetClientsDTO'

// Repository
import { IClientsRepository } from '../repositories/IClientsRepository'

// Provider
import { errorProvider } from 'src/shared/providers'

export class GetClientsUseCase {
  constructor(private clientsRepository: IClientsRepository) {}

  async execute(params: IGetClientsDTO) {
    try {
      return await this.clientsRepository.findAll(params)
    } catch (e) {
      throw errorProvider.handle(e, {}, 'Erro ao buscar clientes, tente novamente mais tarde.')
    }
  }
}
