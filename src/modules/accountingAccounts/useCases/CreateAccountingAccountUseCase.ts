// Interfaces
import { IAccountingAccountsRepository } from '../repositories/IAccountingAccountsRepository'
import { ICreateAccountingAccountDTO } from '../dtos/ICreateAccountingAccountDTO'

// Providers
import { errorProvider } from 'src/shared/providers'

export class CreateAccountingAccountUseCase {
  constructor(private accountingAccountsRepository: IAccountingAccountsRepository) {}

  async execute(data: ICreateAccountingAccountDTO) {
    try {
      await this.accountingAccountsRepository.createAccountingAccount(data)
    } catch (e) {
      throw errorProvider.handle(e, {}, 'Erro ao criar conta contábil, tente novamente mais tarde.')
    }
  }
}
