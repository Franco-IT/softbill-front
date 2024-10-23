// Repositories
import { IBankAccountsRepository } from '../repositories/IBankAccountsRepository'

// DTOs
import { IDeleteBankAccountDTO } from '../dtos/IDeleteBankAccountDTO'

// Providers
import { errorProvider } from 'src/shared/providers'

export class DeleteBankAccountUseCase {
  constructor(private bankAccountsRepository: IBankAccountsRepository) {}

  async execute(data: IDeleteBankAccountDTO) {
    try {
      await this.bankAccountsRepository.deleteBankAccount(data)
    } catch (error: any) {
      throw errorProvider.handle(error, {}, 'Erro ao deletar banco, tente novamente mais tarde.')
    }
  }
}
