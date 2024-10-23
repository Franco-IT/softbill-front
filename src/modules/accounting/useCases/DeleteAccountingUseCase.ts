// DTOs
import { IDeleteAccountingDTO } from '../dtos/IDeleteAccountingDTO'

// Repository
import { IAccountingsRepository } from '../repositories/IAccountingsRepository'

// Provider
import { errorProvider } from 'src/shared/providers'

export class DeleteAccountingUseCase {
  constructor(private accountingsRepository: IAccountingsRepository) {}

  async execute(data: IDeleteAccountingDTO) {
    try {
      await this.accountingsRepository.delete(data)
    } catch (e) {
      throw errorProvider.handle(e, {}, 'Erro ao deletar contabilidade, tente novamente mais tarde.')
    }
  }
}
