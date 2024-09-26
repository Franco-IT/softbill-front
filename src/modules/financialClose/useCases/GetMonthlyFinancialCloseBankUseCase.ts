import { errorProvider } from 'src/shared/providers'
import { IGetMonthlyFinancialCloseBankDTO } from '../dtos/IGetMonthlyFinancialCloseBankDTO'
import { IFinancialCloseRepository } from '../repositories/IFinancialCloseRepository'
import { errors } from '../errors'

export class GetMonthlyFinancialCloseBankUseCase {
  private financialCloseRepository: IFinancialCloseRepository

  constructor(financialCloseRepository: IFinancialCloseRepository) {
    this.financialCloseRepository = financialCloseRepository
  }

  async execute(data: IGetMonthlyFinancialCloseBankDTO) {
    try {
      const response = await this.financialCloseRepository.getMonthlyFinancialCloseBank(data)

      return response.data
    } catch (error: any) {
      throw errorProvider.handle(error, errors, 'Error ao buscar dados do fechamento, tente novamente mais tarde.')
    }
  }
}
