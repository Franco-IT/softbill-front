import { errorProvider } from 'src/shared/providers'
import { IDeleteStatementFileDTO } from '../dtos/IDeleteStatementFileDTO'
import { IFinancialCloseRepository } from '../repositories/IFinancialCloseRepository'

export class DeleteStatementFileUseCase {
  private financialCloseRepository: IFinancialCloseRepository

  constructor(financialCloseRepository: IFinancialCloseRepository) {
    this.financialCloseRepository = financialCloseRepository
  }

  async execute(data: IDeleteStatementFileDTO) {
    try {
      return this.financialCloseRepository.deleteStatementFile(data)
    } catch (error: any) {
      errorProvider.handle(error, {}, 'Error ao deletar arquivo, tente novamente mais tarde.')
    }
  }
}
