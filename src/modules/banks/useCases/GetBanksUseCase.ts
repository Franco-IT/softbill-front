import { IGetBanksDTO } from '../dtos/IGetBanksDTO'
import { IBankRepository } from '../repositories/IBankRepository'
import { errorProvider } from 'src/shared/providers'

export class GetBanksUseCase {
  private bankRepository: IBankRepository

  constructor(bankRepository: IBankRepository) {
    this.bankRepository = bankRepository
  }

  async execute(params: IGetBanksDTO) {
    try {
      const response = await this.bankRepository.getBanks(params)

      return response.data
    } catch (error: any) {
      throw errorProvider.handle(error, {}, 'Erro ao buscar bancos.')
    }
  }
}
