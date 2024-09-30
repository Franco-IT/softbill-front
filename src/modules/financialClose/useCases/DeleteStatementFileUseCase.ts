import { errorProvider } from 'src/shared/providers'
import { IDeleteStatementFileDTO } from '../dtos/IDeleteStatementFileDTO'
import { IFinancialCloseRepository } from '../repositories/IFinancialCloseRepository'
import { errors } from '../errors'

export class DeleteStatementFileUseCase {
  private financialCloseRepository: IFinancialCloseRepository

  constructor(financialCloseRepository: IFinancialCloseRepository) {
    this.financialCloseRepository = financialCloseRepository
  }

  async execute(data: IDeleteStatementFileDTO) {
    try {
      const response = await this.financialCloseRepository.deleteStatementFile(data)

      return response
    } catch (error: any) {
      throw errorProvider.handle(error, errors, 'Error ao deletar arquivo, tente novamente mais tarde.')
    }
  }
}
