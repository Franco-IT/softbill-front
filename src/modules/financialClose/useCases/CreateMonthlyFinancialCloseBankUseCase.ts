import { errorProvider } from 'src/shared/providers'
import { ICreateMonthlyFinancialCloseBankDTO } from '../dtos/ICreateMonthlyFinancialCloseBankDTO'
import { IFinancialCloseRepository } from '../repositories/IFinancialCloseRepository'
import { errors } from '../errors'

export class CreateMonthlyFinancialCloseBankUseCase {
  constructor(private financialCloseRepository: IFinancialCloseRepository) {}

  async execute(data: ICreateMonthlyFinancialCloseBankDTO) {
    try {
      const response = await this.financialCloseRepository.createMonthlyFinancialCloseBank(data)

      return response
    } catch (error) {
      throw errorProvider.handle(error, errors, 'Erro ao criar fechamento para este banco, tente novamente mais tarde.')
    }
  }
}
