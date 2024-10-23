// DTOs
import { IUpdateAccountingDTO } from '../dtos/IUpdateAccountingDTO'

// Repository
import { IAccountingsRepository } from '../repositories/IAccountingsRepository'

// Provider
import { errorProvider } from 'src/shared/providers'

export class UpdateAccountingUseCase {
  constructor(private accountingsRepository: IAccountingsRepository) {}

  async execute(data: IUpdateAccountingDTO) {
    try {
      await this.accountingsRepository.update(data)
    } catch (e) {
      throw errorProvider.handle(e, {}, 'Erro ao atualizar o contabilidade, tente novamente mais tarde.')
    }
  }
}
