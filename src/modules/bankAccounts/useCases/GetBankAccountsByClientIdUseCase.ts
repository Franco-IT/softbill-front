// Repositories
import { IBankAccountsRepository } from '../repositories/IBankAccountsRepository'

// DTOs
import { IGetBankAccountsByClientIdDTO } from '../dtos/IGetBankAccountsByClientIdDTO'

// Providers
import { errorProvider } from 'src/shared/providers'

export class GetBankAccountsByClientIdUseCase {
  constructor(private bankAccountRepository: IBankAccountsRepository) {}

  async execute(data: IGetBankAccountsByClientIdDTO) {
    try {
      return await this.bankAccountRepository.getBankAccountsByClientId(data)
    } catch (error: any) {
      throw errorProvider.handle(error, {}, 'Erro ao buscar contas do cliente, tente novamente mais tarde.')
    }
  }
}
