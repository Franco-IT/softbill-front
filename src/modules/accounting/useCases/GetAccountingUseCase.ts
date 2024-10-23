// DTOs
import { IGetAccountingDTO } from '../dtos/IGetAccountingDTO'

// Repository
import { IAccountingsRepository } from '../repositories/IAccountingsRepository'

// Provider
import { errorProvider } from 'src/shared/providers'

export class GetAccountingUseCase {
  constructor(private accountingsRepository: IAccountingsRepository) {}

  async execute(data: IGetAccountingDTO) {
    try {
      return await this.accountingsRepository.findByID(data)
    } catch (e) {
      throw errorProvider.handle(e, {}, 'Erro ao buscar contabilidade, tente novamente mais tarde.')
    }
  }
}
