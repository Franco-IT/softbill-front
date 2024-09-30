import { errorProvider } from 'src/shared/providers'
import { IGetMonthlyFinancialCloseStatisticsDTO } from '../dtos/IGetMonthlyFinancialCloseStatisticsDTO'
import { IFinancialCloseRepository } from '../repositories/IFinancialCloseRepository'
import { errors } from '../errors'

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
      throw errorProvider.handle(error, errors, 'Error ao buscar estatísticas do dashboard, tente novamente mais tarde.')
    }
  }
}
