// DTOs
import { IUpdateAccountantDTO } from '../dtos/IUpdateAccountantDTO'

// Repository
import { IAccountantsRepository } from '../repositories/IAccountantsRepository'

// Provider
import { errorProvider } from 'src/shared/providers'

export class UpdateAccountantUseCase {
  constructor(private accountantsRepository: IAccountantsRepository) {}

  async execute(data: IUpdateAccountantDTO) {
    try {
      await this.accountantsRepository.update(data)
    } catch (e) {
      throw errorProvider.handle(e, {}, 'Erro ao atualizar o contador, tente novamente mais tarde.')
    }
  }
}
