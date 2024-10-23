// DTOs
import { IGetAccountantsDTO } from '../dtos/IGetAccountantsDTO'

// Repository
import { IAccountantsRepository } from '../repositories/IAccountantsRepository'

// Provider
import { errorProvider } from 'src/shared/providers'

export class GetAccountantsUseCase {
  constructor(private accountantsRepository: IAccountantsRepository) {}

  async execute(params: IGetAccountantsDTO) {
    try {
      return await this.accountantsRepository.findAll(params)
    } catch (e) {
      throw errorProvider.handle(e, {}, 'Erro ao buscar contadores, tente novamente mais tarde.')
    }
  }
}
