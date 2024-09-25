import { errorProvider } from 'src/shared/providers'
import { IDeleteMonthlyFinancialCloseBankDTO } from '../dtos/IDeleteMonthlyFinancialCloseBankDTO'
import { IFinancialCloseRepository } from '../repositories/IFinancialCloseRepository'

export class DeleteMonthlyFinancialCloseBankUseCase {
  private financialCloseRepository: IFinancialCloseRepository

  constructor(financialCloseRepository: IFinancialCloseRepository) {
    this.financialCloseRepository = financialCloseRepository
  }

  async execute(data: IDeleteMonthlyFinancialCloseBankDTO) {
    try {
      return this.financialCloseRepository.deleteMonthlyFinancialCloseBank(data)
    } catch (error: any) {
      errorProvider.handle(error, {}, 'Error ao deletar o fechamento, tente novamente mais tarde.')
    }
  }
}
