// DTOs
import { IGetAccountantDTO } from '../dtos/IGetAccountantDTO'

// Repository
import { IAccountantsRepository } from '../repositories/IAccountantsRepository'

// Provider
import { errorProvider } from 'src/shared/providers'

export class GetAccountantUseCase {
  constructor(private accountantsRepository: IAccountantsRepository) {}

  async execute(data: IGetAccountantDTO) {
    try {
      return await this.accountantsRepository.findByID(data)
    } catch (e) {
      throw errorProvider.handle(e, {}, 'Erro ao buscar contador, tente novamente mais tarde.')
    }
  }
}
