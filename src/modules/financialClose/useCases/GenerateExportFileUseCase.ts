import { errorProvider } from 'src/shared/providers'
import { IGenerateExportFileDTO } from '../dtos/IGenerateExportFileDTO'
import { IFinancialCloseRepository } from '../repositories/IFinancialCloseRepository'

export class GenerateExportFileUseCase {
  constructor(private financialCloseRepository: IFinancialCloseRepository) {}

  async execute(data: IGenerateExportFileDTO) {
    try {
      const response = await this.financialCloseRepository.generateExportFile(data)

      return response
    } catch (error) {
      throw errorProvider.handle(error, {}, 'Error ao gerar arquivo de exportação, tente novamente mais tarde.')
    }
  }
}
