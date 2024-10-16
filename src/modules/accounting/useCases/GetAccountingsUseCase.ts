// DTOs
import { IGetAccountingsDTO } from '../dtos/IGetAccountingsDTO'

// Repository
import { IAccountingsRepository } from '../repositories/IAccountingsRepository'

// Provider
import { errorProvider } from 'src/shared/providers'

export class GetAccountingsUseCase {
  constructor(private accountingsRepository: IAccountingsRepository) {}

  async execute(params: IGetAccountingsDTO) {
    try {
      return await this.accountingsRepository.findAll(params)
    } catch (e) {
      throw errorProvider.handle(e, {}, 'Erro ao buscar contabilidades, tente novamente mais tarde.')
    }
  }
}
