import { errorProvider } from 'src/shared/providers'
import { IFinancialCloseRepository } from '../repositories/IFinancialCloseRepository'
import { IGetMonthlyFinancialClosesDashboardDataDTO } from '../dtos/IGetMonthlyFinancialClosesDashboardDataDTO'

export class GetMonthlyFinancialCloseDashboardDataUseCase {
  private financialCloseRepository: IFinancialCloseRepository

  constructor(financialCloseRepository: IFinancialCloseRepository) {
    this.financialCloseRepository = financialCloseRepository
  }

  async execute(params: IGetMonthlyFinancialClosesDashboardDataDTO) {
    try {
      const response = await this.financialCloseRepository.getMonthlyFinancialCloseDashboardData(params)

      return response.data
    } catch (error: any) {
      errorProvider.handle(error, {}, 'Error ao buscar dados do dashboard, tente novamente mais tarde.')
    }
  }
}
