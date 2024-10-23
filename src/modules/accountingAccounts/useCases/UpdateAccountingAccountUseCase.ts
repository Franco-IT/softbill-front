// Interfaces
import { IAccountingAccountsRepository } from '../repositories/IAccountingAccountsRepository'
import { IUpdateAccountingAccountDTO } from '../dtos/IUpdateAccountingAccountDTO'

// Providers
import { errorProvider } from 'src/shared/providers'


export class UpdateAccountingAccountUseCase {
  constructor(private accountingAccountsRepository: IAccountingAccountsRepository) {}

  async execute(data: IUpdateAccountingAccountDTO) {
    try {
      await this.accountingAccountsRepository.updateAccountingAccount(data)
    } catch (e) {
      throw errorProvider.handle(e, {}, 'Erro ao atualizar conta contábil, tente novamente mais tarde.')
    }
  }
}
