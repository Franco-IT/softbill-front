import { errorProvider } from 'src/shared/providers'
import { IBankRepository } from '../repositories/IBankRepository'
import { IChangeBankStatusDTO } from '../dtos/IChangeBankStatusDTO'

export class ChangeBankStatusUseCase {
  private bankRepository: IBankRepository

  constructor(bankRepository: IBankRepository) {
    this.bankRepository = bankRepository
  }

  async execute(data: IChangeBankStatusDTO) {
    try {
      const response = await this.bankRepository.changeBankStatus(data)

      return response.data
    } catch (error: any) {
      throw errorProvider.handle(error, {}, 'Erro ao alterar status do banco.')
    }
  }
}
