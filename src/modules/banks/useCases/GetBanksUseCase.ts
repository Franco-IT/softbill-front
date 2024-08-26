import { IGetBanksDTO } from '../dtos/IGetBanksDTO'
import { IBankRepository } from '../repositories/IBankRepository'
import { errorProvider } from 'src/shared/providers'

export class GetBanksUseCase {
  private bankRepository: IBankRepository

  constructor(bankRepository: IBankRepository) {
    this.bankRepository = bankRepository
  }

  async execute(data: IGetBanksDTO) {
    try {
      const response = await this.bankRepository.getBanks(data)

      return response.data
    } catch (error: any) {
      errorProvider.handle(error, {}, 'Erro ao buscar bancos.')
    }
  }
}
