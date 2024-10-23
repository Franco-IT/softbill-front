// DTOs
import { IDeleteClientDTO } from '../dtos/IDeleteClientDTO'

// Repository
import { IClientsRepository } from '../repositories/IClientsRepository'

// Provider
import { errorProvider } from 'src/shared/providers'

export class DeleteClientUseCase {
  constructor(private clientsRepository: IClientsRepository) {}

  async execute(data: IDeleteClientDTO) {
    try {
      await this.clientsRepository.delete(data)
    } catch (e) {
      throw errorProvider.handle(e, {}, 'Erro ao deletar cliente, tente novamente mais tarde.')
    }
  }
}
