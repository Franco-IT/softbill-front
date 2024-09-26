import { errorProvider } from 'src/shared/providers'
import { IGetMonthlyFinancialCloseBanksDTO } from '../dtos/IGetMonthlyFinancialCloseBanksDTO'
import { IFinancialCloseRepository } from '../repositories/IFinancialCloseRepository'
import { errors } from '../errors'

export class GetMonthlyFinancialCloseBanksUseCase {
  private financialCloseRepository: IFinancialCloseRepository

  constructor(financialCloseRepository: IFinancialCloseRepository) {
    this.financialCloseRepository = financialCloseRepository
  }

  async execute(params: IGetMonthlyFinancialCloseBanksDTO) {
    try {
      const response = await this.financialCloseRepository.getMonthlyFinancialCloseBanks(params)

      return response.data
    } catch (error: any) {
      throw errorProvider.handle(error, errors, 'Error ao buscar dados do fechamento, tente novamente mais tarde.')
    }
  }
}
