// Repositories
import { IBankAccountsRepository } from '../repositories/IBankAccountsRepository'

// DTOs
import { ICreateBankAccountDTO } from '../dtos/ICreateBankAccountDTO'

// Providers
import { errorProvider } from 'src/shared/providers'

export class CreateBankAccountUseCase {
  constructor(private bankAccountsRepository: IBankAccountsRepository) {}

  async execute(data: ICreateBankAccountDTO) {
    try {
      await this.bankAccountsRepository.createBankAccount(data)
    } catch (e) {
      throw errorProvider.handle(e, {}, 'Erro ao realizar a vinculação do banco, tente novamente mais tarde.')
    }
  }
}
