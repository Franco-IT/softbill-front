import { IChangeUserPasswordDTO } from '../dtos/IChangeUserPasswordDTO'
import { ICreateCounterDTO } from '../dtos/ICreateCounterDTO'
import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { IDeleteUserDTO } from '../dtos/IDeleteUserDTO'
import { IFirstAccessUserDTO } from '../dtos/IFirstAccessUserDTO'
import { IUpdateCounterDTO } from '../dtos/IUpdateCounterDTO'
import { ChangePasswordUseCase } from '../useCases/ChangePasswordUseCase'
import { CreateCounterUseCase } from '../useCases/CreateCounterUseCase'
import { CreateUserUseCase } from '../useCases/CreateUserUseCase'
import { DeleteUserUseCase } from '../useCases/DeleteUserUseCase'
import { FirstAccessUserUseCase } from '../useCases/FirstAccessUserUseCase'
import { UpdateCounterUseCase } from '../useCases/UpdateCounterUseCase'

export class UserController {
  private createUserUseCase: CreateUserUseCase
  private createCounterUseCase: CreateCounterUseCase
  private updateCounterUseCase: UpdateCounterUseCase
  private deleteUserUseCase: DeleteUserUseCase
  private changePasswordUseCase: ChangePasswordUseCase
  private firstAccessUserUseCase: FirstAccessUserUseCase

  constructor(
    createUserUseCase: CreateUserUseCase,
    createCounterUseCase: CreateCounterUseCase,
    updateCounterUseCase: UpdateCounterUseCase,
    deleteUserUseCase: DeleteUserUseCase,
    changePasswordUseCase: ChangePasswordUseCase,
    firstAccessUserUseCase: FirstAccessUserUseCase
  ) {
    this.createUserUseCase = createUserUseCase
    this.createCounterUseCase = createCounterUseCase
    this.updateCounterUseCase = updateCounterUseCase,
    this.deleteUserUseCase = deleteUserUseCase,
    this.changePasswordUseCase = changePasswordUseCase,
    this.firstAccessUserUseCase = firstAccessUserUseCase
  }

  async create(data: ICreateUserDTO) {
    return await this.createUserUseCase.execute(data)
  }

  async createCounter(data: ICreateCounterDTO) {
    return await this.createCounterUseCase.execute(data)
  }

  async updateCounter(data: IUpdateCounterDTO) {
    return await this.updateCounterUseCase.execute(data)
  }

  async delete(data: IDeleteUserDTO) {
    return await this.deleteUserUseCase.execute(data)
  }

  async changePassword(data: IChangeUserPasswordDTO) {
    return await this.changePasswordUseCase.execute(data)
  }

  async firstAccess(data: IFirstAccessUserDTO) {
    return await this.firstAccessUserUseCase.execute(data)
  }
}