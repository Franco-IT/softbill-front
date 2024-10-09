import { errorProvider } from 'src/shared/providers'
import { IGetAccountingAccountsByClientDTO } from '../dtos/IGetAccountingAccountsByClientDTO'
import { IClientsRepository } from '../repositories/IClientsRepository'

export class GetAccountingAccountsByClientUseCase {
  constructor(private clientsRepository: IClientsRepository) {}

  async execute(data: IGetAccountingAccountsByClientDTO) {
    try {
      return this.clientsRepository.getAccountingAccountsByClient(data)
    } catch (e) {
      throw errorProvider.handle(e, {}, 'Erro ao buscar contas contábeis, tente novamente mais tarde.')
    }
  }
}
