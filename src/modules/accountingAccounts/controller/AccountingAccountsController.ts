// DTOs
import { ICreateAccountingAccountDTO } from '../dtos/ICreateAccountingAccountDTO'
import { IGetAccountingAccountsByClientDTO } from '../dtos/IGetAccountingAccountsByClientDTO'
import { IDeleteAccountingAccountDTO } from '../dtos/IDeleteAccountingAccountDTO'
import { IUpdateAccountingAccountDTO } from '../dtos/IUpdateAccountingAccountDTO'

// Use Cases
import { CreateAccountingAccountUseCase } from '../useCases/CreateAccountingAccountUseCase'
import { GetAccountingAccountsByClientUseCase } from '../useCases/GetAccountingAccountsByClientUseCase'
import { DeleteAccountingAccountUseCase } from '../useCases/DeleteAccountingAccountUseCase'
import { UpdateAccountingAccountUseCase } from '../useCases/UpdateAccountingAccountUseCase'

export class AccountingAccountsController {
  constructor(
    private getAccountingAccountsByClientUseCase: GetAccountingAccountsByClientUseCase,
    private createAccountingAccountUseCase: CreateAccountingAccountUseCase,
    private updateAccountingAccountUseCase: UpdateAccountingAccountUseCase,
    private deleteAccountingAccountUseCase: DeleteAccountingAccountUseCase
  ) {}

  async getAccountingAccountsByClient(data: IGetAccountingAccountsByClientDTO) {
    return this.getAccountingAccountsByClientUseCase.execute(data)
  }

  async createAccountingAccount(data: ICreateAccountingAccountDTO) {
    return this.createAccountingAccountUseCase.execute(data)
  }

  async updateAccountingAccount(data: IUpdateAccountingAccountDTO) {
    return this.updateAccountingAccountUseCase.execute(data)
  }

  async deleteAccountingAccount(data: IDeleteAccountingAccountDTO) {
    return this.deleteAccountingAccountUseCase.execute(data)
  }
}
