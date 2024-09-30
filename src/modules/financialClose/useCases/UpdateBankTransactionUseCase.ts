import { errorProvider } from 'src/shared/providers'
import { IUpdateBankTransactionDTO } from '../dtos/IUpdateBankTransactionDTO'
import { IFinancialCloseRepository } from '../repositories/IFinancialCloseRepository'
import { errors } from '../errors'

export class UpdateBankTransactionUseCase {
  constructor(private financialCloseRepository: IFinancialCloseRepository) {}

  async execute(data: IUpdateBankTransactionDTO) {
    try {
      const response = await this.financialCloseRepository.updateBankTransaction(data)

      return response
    } catch (error) {
      throw errorProvider.handle(error, errors, 'Erro ao atualizar transação, tente novamente mais tarde.')
    }
  }
}
