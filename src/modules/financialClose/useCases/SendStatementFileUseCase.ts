import { errorProvider } from 'src/shared/providers'
import { ISendStatementFileDTO } from '../dtos/ISendStatementFileDTO'
import { IFinancialCloseRepository } from '../repositories/IFinancialCloseRepository'

export class SendStatementFileUseCase {
  private financialCloseRepository: IFinancialCloseRepository

  constructor(financialCloseRepository: IFinancialCloseRepository) {
    this.financialCloseRepository = financialCloseRepository
  }

  async execute(data: ISendStatementFileDTO) {
    try {
      return this.financialCloseRepository.sendStatementFile(data)
    } catch (error: any) {
      errorProvider.handle(error, {}, 'Error ao enviar arquivo, tente novamente mais tarde.')
    }
  }
}
