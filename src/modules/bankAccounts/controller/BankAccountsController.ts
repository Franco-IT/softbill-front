import { GetBankAccountsByClientIdUseCase } from '../useCases/GetBankAccountsByClientIdUseCase'
import { IGetBankAccountsByClientIdDTO } from '../dtos/IGetBankAccountsByClientIdDTO'
import { CreateBankAccountUseCase } from '../useCases/CreateBankAccountUseCase'
import { ICreateBankAccountDTO } from '../dtos/ICreateBankAccountDTO'
import { DeleteBankAccountUseCase } from '../useCases/DeleteBankAccountUseCase'
import { IDeleteBankAccountDTO } from '../dtos/IDeleteBankAccountDTO'

export class BankAccountsController {
  constructor(
    private getBankAccountsByClientIdUseCase: GetBankAccountsByClientIdUseCase,
    private createBankAccountUseCase: CreateBankAccountUseCase,
    private deleteBankAccountUseCase: DeleteBankAccountUseCase
  ) {}

  async getBankAccountsByClientId(data: IGetBankAccountsByClientIdDTO) {
    return this.getBankAccountsByClientIdUseCase.execute(data)
  }

  async createBankAccount(data: ICreateBankAccountDTO) {
    return this.createBankAccountUseCase.execute(data)
  }

  async deleteBankAccount(data: IDeleteBankAccountDTO) {
    return this.deleteBankAccountUseCase.execute(data)
  }
}
