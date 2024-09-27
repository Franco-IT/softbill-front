import { errorProvider } from 'src/shared/providers'
import { IUpdateMonthlyFinancialCloseBankDTO } from '../dtos/IUpdateMonthlyFinancialCloseBankDTO'
import { IFinancialCloseRepository } from '../repositories/IFinancialCloseRepository'
import { errors } from '../errors'

export class UpdateMonthlyFinancialCloseBankUseCase {
  constructor(private financialCloseRepository: IFinancialCloseRepository) {}

  async execute(data: IUpdateMonthlyFinancialCloseBankDTO) {
    try {
      const response = await this.financialCloseRepository.updateMonthlyFinancialCloseBank(data)

      return response.data
    } catch (error) {
      throw errorProvider.handle(error, errors, 'Erro ao validar fechamento, tente novamente mais tarde.')
    }
  }
}
