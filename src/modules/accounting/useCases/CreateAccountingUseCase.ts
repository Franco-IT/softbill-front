// DTOs
import { ICreateAccountingDTO } from '../dtos/ICreateAccountingDTO'

// Repository
import { IAccountingsRepository } from '../repositories/IAccountingsRepository'

// Provider
import { errorProvider } from 'src/shared/providers'

// Errors
import { errors } from '../errors'

export class CreateAccountingUseCase {
  constructor(private accountingsRepository: IAccountingsRepository) {}

  async execute(data: ICreateAccountingDTO) {
    try {
      await this.accountingsRepository.create(data)
    } catch (e) {
      throw errorProvider.handle(e, errors, 'Erro ao criar contabilidade, tente novamente mais tarde.')
    }
  }
}
