import { IClientsRepository } from '../repositories/IClientsRepository'
import { IDeleteAccountingAccountDTO } from '../dtos/IDeleteAccountingAccountDTO'
import { errorProvider } from 'src/shared/providers'

export class DeleteAccountingAccountUseCase {
  constructor(private clientsRepository: IClientsRepository) {}

  async execute(data: IDeleteAccountingAccountDTO) {
    try {
      await this.clientsRepository.deleteAccountingAccount(data)
    } catch (e) {
      throw errorProvider.handle(e, {}, 'Erro ao deletar conta contábil, tente novamente mais tarde.')
    }
  }
}
