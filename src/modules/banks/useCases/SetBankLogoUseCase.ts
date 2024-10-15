// Repositories
import { IBankRepository } from '../repositories/IBankRepository'

// DTOs
import { ISetBankLogoDTO } from '../dtos/ISetBankLogoDTO'

// Providers
import { errorProvider } from 'src/shared/providers'

// Errors
import { errors } from '../errors'

export class SetBankLogoUseCase {
  constructor(private bankRepository: IBankRepository) {}

  async execute(data: ISetBankLogoDTO) {
    try {
      await this.bankRepository.setBankLogo(data)
    } catch (error: any) {
      throw errorProvider.handle(error, errors, 'Erro ao atualizar imagem, tente novamente mais tarde.')
    }
  }
}
