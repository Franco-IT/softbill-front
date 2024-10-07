import { errorProvider } from 'src/shared/providers'
import { IRequestConciliationDTO } from '../dtos/IRequestConciliationDTO'
import { IFinancialCloseRepository } from '../repositories/IFinancialCloseRepository'
import { errors } from '../errors'

export class RequestConciliationUseCase {
  constructor(private financialCloseRepository: IFinancialCloseRepository) {}

  async execute(data: IRequestConciliationDTO): Promise<void> {
    try {
      const response = await this.financialCloseRepository.requestConciliation(data)

      return response.data
    } catch (error) {
      throw errorProvider.handle(error, errors, 'Error ao Solicitar Conciliação, tente novamente mais tarde.')
    }
  }
}
