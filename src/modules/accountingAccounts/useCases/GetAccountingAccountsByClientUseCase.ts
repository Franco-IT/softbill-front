// Interfaces
import { IGetAccountingAccountsByClientDTO } from '../dtos/IGetAccountingAccountsByClientDTO'
import { IAccountingAccountsRepository } from '../repositories/IAccountingAccountsRepository'

// Providers
import { errorProvider } from 'src/shared/providers'

export class GetAccountingAccountsByClientUseCase {
  constructor(private accountingAccountsRepository: IAccountingAccountsRepository) {}

  async execute(data: IGetAccountingAccountsByClientDTO) {
    try {
      return this.accountingAccountsRepository.getAccountingAccountsByClient(data)
    } catch (e) {
      throw errorProvider.handle(e, {}, 'Erro ao buscar contas contábeis, tente novamente mais tarde.')
    }
  }
}
