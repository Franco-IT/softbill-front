import { errorProvider } from 'src/shared/providers'
import { IGetBankTransactionsDTO } from '../dtos/IGetBankTransactionsDTO'
import { IFinancialCloseRepository } from '../repositories/IFinancialCloseRepository'
import { errors } from '../errors'

export class GetBankTransactionsUseCase {
  constructor(private financialCloseRepository: IFinancialCloseRepository) {}

  async execute(data: IGetBankTransactionsDTO) {
    try {
      const response = await this.financialCloseRepository.getBankTransactions(data)

      return response.data
    } catch (error) {
      throw errorProvider.handle(error, errors, 'Erro ao buscar transações, tente novamente mais tarde.')
    }
  }
}
