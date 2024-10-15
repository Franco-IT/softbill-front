// Repositories
import { IBankRepository } from '../repositories/IBankRepository'

// DTOs
import { IChangeBankStatusDTO } from '../dtos/IChangeBankStatusDTO'

// Providers
import { errorProvider } from 'src/shared/providers'

// Errors
import { errors } from '../errors'

export class ChangeBankStatusUseCase {
  constructor(private bankRepository: IBankRepository) {}

  async execute(data: IChangeBankStatusDTO) {
    try {
      await this.bankRepository.changeBankStatus(data)
    } catch (error: any) {
      throw errorProvider.handle(error, errors, 'Erro ao alterar status do banco, tente novamente mais tarde.')
    }
  }
}
