// DTOs
import { IDeleteAccountantDTO } from '../dtos/IDeleteAccountantDTO'

// Repository
import { IAccountantsRepository } from '../repositories/IAccountantsRepository'

// Provider
import { errorProvider } from 'src/shared/providers'

export class DeleteAccountantUseCase {
  constructor(private accountantsRepository: IAccountantsRepository) {}

  async execute(data: IDeleteAccountantDTO) {
    try {
      await this.accountantsRepository.delete(data)
    } catch (e) {
      throw errorProvider.handle(e, {}, 'Erro ao deletar o contador, tente novamente mais tarde.')
    }
  }
}
