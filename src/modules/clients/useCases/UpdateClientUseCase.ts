// DTOs
import { IUpdateClientDTO } from '../dtos/IUpdateClientDTO'

// Repository
import { IClientsRepository } from '../repositories/IClientsRepository'

// Provider
import { errorProvider } from 'src/shared/providers'

export class UpdateClientUseCase {
  constructor(private clientsRepository: IClientsRepository) {}

  async execute(data: IUpdateClientDTO) {
    try {
      await this.clientsRepository.update(data)
    } catch (e) {
      throw errorProvider.handle(e, {}, 'Erro ao atualizar o cliente, tente novamente mais tarde.')
    }
  }
}
