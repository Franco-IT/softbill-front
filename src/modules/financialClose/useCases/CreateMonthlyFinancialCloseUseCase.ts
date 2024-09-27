import { errorProvider } from 'src/shared/providers'
import { ICreateMonthlyFinancialCloseDTO } from '../dtos/ICreateMonthlyFinancialCloseDTO'
import { IFinancialCloseRepository } from '../repositories/IFinancialCloseRepository'
import { errors } from '../errors'

export class CreateMonthlyFinancialCloseUseCase {
  constructor(private financialCloseRepository: IFinancialCloseRepository) {}

  async execute(data: ICreateMonthlyFinancialCloseDTO) {
    try {
      const response = await this.financialCloseRepository.createMonthlyFinancialClose(data)

      return response
    } catch (error) {
      throw errorProvider.handle(error, errors, 'Erro ao criar fechamento, tente novamente mais tarde.')
    }
  }
}
