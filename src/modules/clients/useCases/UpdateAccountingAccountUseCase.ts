import { IClientsRepository } from '../repositories/IClientsRepository'
import { IUpdateAccountingAccountDTO } from '../dtos/IUpdateAccountingAccountDTO'
import { errorProvider } from '../../../shared/providers'

export class UpdateAccountingAccountUseCase {
  constructor(private clientRepository: IClientsRepository) {}

  async execute(data: IUpdateAccountingAccountDTO) {
    try {
      await this.clientRepository.updateAccountingAccount(data)
    } catch (e) {
      throw errorProvider.handle(e, {}, 'Erro ao atualizar conta contábil, tente novamente mais tarde.')
    }
  }
}
