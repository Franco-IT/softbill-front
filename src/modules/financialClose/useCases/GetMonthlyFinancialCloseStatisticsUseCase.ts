import { errorProvider } from 'src/shared/providers'
import { IGetMonthlyFinancialCloseStatisticsDTO } from '../dtos/IGetMonthlyFinancialCloseStatisticsDTO'
import { IFinancialCloseRepository } from '../repositories/IFinancialCloseRepository'

export class GetMonthlyFinancialCloseStatisticsUseCase {
  private financialCloseRepository: IFinancialCloseRepository

  constructor(financialCloseRepository: IFinancialCloseRepository) {
    this.financialCloseRepository = financialCloseRepository
  }

  async execute(params: IGetMonthlyFinancialCloseStatisticsDTO) {
    try {
      const response = await this.financialCloseRepository.getMonthlyFinancialCloseStatistics(params)

      return response.data
    } catch (error: any) {
      errorProvider.handle(error, {}, 'Error ao buscar estatísticas do dashboard, tente novamente mais tarde.')
    }
  }
}
