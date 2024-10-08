import { errorProvider } from 'src/shared/providers'
import { IDeleteMonthlyFinancialCloseBankDTO } from '../dtos/IDeleteMonthlyFinancialCloseBankDTO'
import { IFinancialCloseRepository } from '../repositories/IFinancialCloseRepository'
import { errors } from '../errors'

export class DeleteMonthlyFinancialCloseBankUseCase {
  private financialCloseRepository: IFinancialCloseRepository

  constructor(financialCloseRepository: IFinancialCloseRepository) {
    this.financialCloseRepository = financialCloseRepository
  }

  async execute(data: IDeleteMonthlyFinancialCloseBankDTO) {
    try {
      const response = await this.financialCloseRepository.deleteMonthlyFinancialCloseBank(data)

      return response
    } catch (error: any) {
      throw errorProvider.handle(error, errors, 'Error ao deletar o fechamento, tente novamente mais tarde.')
    }
  }
}
