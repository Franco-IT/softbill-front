import { errorProvider } from 'src/shared/providers'
import { ISetBankLogoDTO } from '../dtos/ISetBankLogoDTO'
import { IBankRepository } from '../repositories/IBankRepository'

export class SetBankLogoUseCase {
  private bankRepository: IBankRepository

  constructor(bankRepository: IBankRepository) {
    this.bankRepository = bankRepository
  }

  async execute(data: ISetBankLogoDTO) {
    try {
      return await this.bankRepository.setBankLogo(data)
    } catch (error: any) {
      throw errorProvider.handle(error, {}, 'Erro ao atualizar imagem.')
    }
  }
}
