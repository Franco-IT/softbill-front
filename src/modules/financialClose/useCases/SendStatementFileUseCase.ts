import { errorProvider } from 'src/shared/providers'
import { ISendStatementFileDTO } from '../dtos/ISendStatementFileDTO'
import { IFinancialCloseRepository } from '../repositories/IFinancialCloseRepository'
import { errors } from '../errors'

export class SendStatementFileUseCase {
  private financialCloseRepository: IFinancialCloseRepository

  constructor(financialCloseRepository: IFinancialCloseRepository) {
    this.financialCloseRepository = financialCloseRepository
  }

  async execute(data: ISendStatementFileDTO) {
    try {
      return this.financialCloseRepository.sendStatementFile(data)
    } catch (error: any) {
      throw errorProvider.handle(error, errors, 'Error ao enviar arquivo, tente novamente mais tarde.')
    }
  }
}
