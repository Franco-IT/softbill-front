import { AxiosResponse } from 'axios'
import { IBankRepository } from '../repositories/IBankRepository'
import { IGetBanksByClientIdDTO } from '../dtos/IGetBanksByClientIdDTO'
import { errorProvider } from 'src/shared/providers'

export class GetBanksByClientIdUseCase {
  constructor(private bankRepository: IBankRepository) {}

  async execute(data: IGetBanksByClientIdDTO): Promise<AxiosResponse | undefined> {
    try {
      return await this.bankRepository.getBanksByClientId(data)
    } catch (error: any) {
      errorProvider.handle(error, {}, 'Erro ao buscar bancos do cliente.')
    }
  }
}
