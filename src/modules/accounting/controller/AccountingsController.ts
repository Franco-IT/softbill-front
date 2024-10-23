// DTOs
import { ICreateAccountingDTO } from '../dtos/ICreateAccountingDTO'
import { IUpdateAccountingDTO } from '../dtos/IUpdateAccountingDTO'
import { IDeleteAccountingDTO } from '../dtos/IDeleteAccountingDTO'
import { IGetAccountingDTO } from '../dtos/IGetAccountingDTO'
import { IGetAccountingsDTO } from '../dtos/IGetAccountingsDTO'

// Use Cases
import { CreateAccountingUseCase } from '../useCases/CreateAccountingUseCase'
import { UpdateAccountingUseCase } from '../useCases/UpdateAccountingUseCase'
import { DeleteAccountingUseCase } from '../useCases/DeleteAccountingUseCase'
import { GetAccountingUseCase } from '../useCases/GetAccountingUseCase'
import { GetAccountingsUseCase } from '../useCases/GetAccountingsUseCase'

export class AccountingsController {
  constructor(
    private createAccountingUseCase: CreateAccountingUseCase,
    private updateAccountingUseCase: UpdateAccountingUseCase,
    private deleteAccountingUseCase: DeleteAccountingUseCase,
    private getAccountingUseCase: GetAccountingUseCase,
    private getAccountingsUseCase: GetAccountingsUseCase
  ) {}

  async create(data: ICreateAccountingDTO) {
    return this.createAccountingUseCase.execute(data)
  }

  async update(data: IUpdateAccountingDTO) {
    return this.updateAccountingUseCase.execute(data)
  }

  async delete(data: IDeleteAccountingDTO) {
    return this.deleteAccountingUseCase.execute(data)
  }

  async findById(data: IGetAccountingDTO) {
    return this.getAccountingUseCase.execute(data)
  }

  async findAll(params: IGetAccountingsDTO) {
    return this.getAccountingsUseCase.execute(params)
  }
}
