// Repositories
import { IBankRepository } from '../repositories/IBankRepository'

// DTOs
import { IGetBanksDTO } from '../dtos/IGetBanksDTO'

// Providers
import { errorProvider } from 'src/shared/providers'

// Errors
import { errors } from '../errors'

export class GetBanksUseCase {
  constructor(private bankRepository: IBankRepository) {}

  async execute(params: IGetBanksDTO) {
    try {
      return await this.bankRepository.getBanks(params)
    } catch (error) {
      throw errorProvider.handle(error, errors, 'Erro ao buscar bancos, tente novamente mais tarde.')
    }
  }
}
