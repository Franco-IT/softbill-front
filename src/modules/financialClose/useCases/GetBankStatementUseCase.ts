import { errorProvider } from 'src/shared/providers'
import { IGetBankStatementDTO } from '../dtos/IGetBankStatementDTO'
import { IFinancialCloseRepository } from '../repositories/IFinancialCloseRepository'
import { errors } from '../errors'

export class GetBankStatementUseCase {
  constructor(private financialCloseRepository: IFinancialCloseRepository) {}

  async execute(data: IGetBankStatementDTO) {
    try {
      const response = await this.financialCloseRepository.getBankStatement(data)

      return response.data
    } catch (error: any) {
      throw errorProvider.handle(error, errors, 'Error ao buscar extrato bancário, tente novamente mais tarde.')
    }
  }
}
