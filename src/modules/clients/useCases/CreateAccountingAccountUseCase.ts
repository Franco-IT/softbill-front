import { IClientsRepository } from '../repositories/IClientsRepository'
import { ICreateAccountingAccountDTO } from '../dtos/ICreateAccountingAccountDTO'
import { errorProvider } from 'src/shared/providers'

export class CreateAccountingAccountUseCase {
  constructor(private clientsRepository: IClientsRepository) {}

  async execute(data: ICreateAccountingAccountDTO) {
    try {
      await this.clientsRepository.createAccountingAccount(data)
    } catch (e) {
      throw errorProvider.handle(e, {}, 'Erro ao criar conta contábil, tente novamente mais tarde.')
    }
  }
}
