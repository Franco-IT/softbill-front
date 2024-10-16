// DTOs
import { ICreateAccountantDTO } from '../dtos/ICreateAccountantDTO'
import { IUpdateAccountantDTO } from '../dtos/IUpdateAccountantDTO'
import { IDeleteAccountantDTO } from '../dtos/IDeleteAccountantDTO'
import { IGetAccountantDTO } from '../dtos/IGetAccountantDTO'
import { IGetAccountantsDTO } from '../dtos/IGetAccountantsDTO'

// Use Cases
import { CreateAccountantUseCase } from '../useCases/CreateAccountantUseCase'
import { UpdateAccountantUseCase } from '../useCases/UpdateAccountantUseCase'
import { DeleteAccountantUseCase } from '../useCases/DeleteAccountantUseCase'
import { GetAccountantUseCase } from '../useCases/GetAccountantUseCase'
import { GetAccountantsUseCase } from '../useCases/GetAccountantsUseCase'

export class AccountantsController {
  constructor(
    private createAccountantUseCase: CreateAccountantUseCase,
    private updateAccountantUseCase: UpdateAccountantUseCase,
    private deleteAccountantUseCase: DeleteAccountantUseCase,
    private getAccountantUseCase: GetAccountantUseCase,
    private getAccountantsUseCase: GetAccountantsUseCase
  ) {}

  async create(data: ICreateAccountantDTO) {
    return this.createAccountantUseCase.execute(data)
  }

  async update(data: IUpdateAccountantDTO) {
    return this.updateAccountantUseCase.execute(data)
  }

  async delete(data: IDeleteAccountantDTO) {
    return this.deleteAccountantUseCase.execute(data)
  }

  async findById(data: IGetAccountantDTO) {
    return this.getAccountantUseCase.execute(data)
  }

  async findAll(params: IGetAccountantsDTO) {
    return this.getAccountantsUseCase.execute(params)
  }
}
