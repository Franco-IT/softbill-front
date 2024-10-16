// DTOs
import { ICreateAccountantDTO } from '../dtos/ICreateAccountantDTO'

// Repository
import { IAccountantsRepository } from '../repositories/IAccountantsRepository'

// Provider
import { errorProvider } from 'src/shared/providers'

// Errors
import { errors } from '../errors'

export class CreateAccountantUseCase {
  constructor(private accountantsRepository: IAccountantsRepository) {}

  async execute(data: ICreateAccountantDTO) {
    try {
      await this.accountantsRepository.create(data)
    } catch (e) {
      throw errorProvider.handle(e, errors, 'Erro ao criar contador, tente novamente mais tarde.')
    }
  }
}
