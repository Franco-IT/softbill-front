import { AxiosResponse } from 'axios'
import { ILinkingBankDTO } from '../dtos/ILinkingBankDTO'
import { IBankRepository } from '../repositories/IBankRepository'
import { errorProvider } from 'src/shared/providers'

export class LinkingBankUseCase {
  private bankRepository: IBankRepository

  constructor(bankRepository: IBankRepository) {
    this.bankRepository = bankRepository
  }

  async execute(data: ILinkingBankDTO): Promise<AxiosResponse | undefined> {
    try {
      return this.bankRepository.linkingBank(data)
    } catch (error: any) {
      throw errorProvider.handle(error, {}, 'Erro ao realizar a vinculação do banco.')
    }
  }
}
