// Repositories
import { IBankRepository } from '../repositories/IBankRepository'

// DTOs
import { IChangeBankDisponibility } from '../dtos/IChangeBankDisponibility'

// Providers
import { errorProvider } from 'src/shared/providers'

// Errors
import { errors } from '../errors'

export class ChangeBankDisponibilityUseCase {
  constructor(private bankRepository: IBankRepository) {}

  async execute(data: IChangeBankDisponibility) {
    try {
      await this.bankRepository.changeBankDisponibility(data)
    } catch (error: any) {
      throw errorProvider.handle(error, errors, 'Erro ao alterar disponibilidade do banco, tente novamente mais tarde.')
    }
  }
}
