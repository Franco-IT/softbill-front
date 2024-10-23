// DTOs
import { ICreateClientDTO } from '../dtos/ICreateClientDTO'

// Repository
import { IClientsRepository } from '../repositories/IClientsRepository'

// Provider
import { errorProvider } from 'src/shared/providers'

// Errors
import { errors } from '../errors'

export class CreateClientUseCase {
  constructor(private clientsRepository: IClientsRepository) {}

  async execute(data: ICreateClientDTO) {
    try {
      await this.clientsRepository.create(data)
    } catch (e) {
      throw errorProvider.handle(e, errors, 'Erro ao criar cliente, tente novamente mais tarde.')
    }
  }
}
