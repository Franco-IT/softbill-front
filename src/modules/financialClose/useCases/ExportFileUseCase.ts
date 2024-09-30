import { errorProvider } from 'src/shared/providers'
import { IFinancialCloseRepository } from '../repositories/IFinancialCloseRepository'
import { IExportFileDTO } from '../dtos/IExportFileDTO'
import { errors } from '../errors'

export class ExportFileUseCase {
  private financialCloseRepository: IFinancialCloseRepository

  constructor(financialCloseRepository: IFinancialCloseRepository) {
    this.financialCloseRepository = financialCloseRepository
  }

  async execute(data: IExportFileDTO) {
    try {
      const response = await this.financialCloseRepository.exportFile(data)

      return response
    } catch (error: any) {
      throw errorProvider.handle(error, errors, 'Error ao exportar arquivo, tente novamente mais tarde.')
    }
  }
}
