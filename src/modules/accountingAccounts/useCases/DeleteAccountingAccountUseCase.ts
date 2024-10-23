// Interfaces
import { IAccountingAccountsRepository } from '../repositories/IAccountingAccountsRepository'
import { IDeleteAccountingAccountDTO } from '../dtos/IDeleteAccountingAccountDTO'

// Providers
import { errorProvider } from 'src/shared/providers'


export class DeleteAccountingAccountUseCase {
  constructor(private accountingAccountsRepository: IAccountingAccountsRepository) {}

  async execute(data: IDeleteAccountingAccountDTO) {
    try {
      await this.accountingAccountsRepository.deleteAccountingAccount(data)
    } catch (e) {
      throw errorProvider.handle(e, {}, 'Erro ao deletar conta contábil, tente novamente mais tarde.')
    }
  }
}
