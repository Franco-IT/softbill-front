import { IChangeUserPasswordDTO } from '../dtos/IChangeUserPasswordDTO'
import { ICreateCounterDTO } from '../dtos/ICreateCounterDTO'
import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { IDeleteUserDTO } from '../dtos/IDeleteUserDTO'
import { IUpdateCounterDTO } from '../dtos/IUpdateCounterDTO'
import { ChangePasswordUseCase } from '../useCases/ChangePasswordUseCase'
import { CreateCounterUseCase } from '../useCases/CreateCounterUseCase'
import { CreateUserUseCase } from '../useCases/CreateUserUseCase'
import { DeleteUserUseCase } from '../useCases/DeleteUserUseCase'
import { UpdateCounterUseCase } from '../useCases/UpdateCounterUseCase'

export class UserController {
  private createUserUseCase: CreateUserUseCase
  private createCounterUseCase: CreateCounterUseCase
  private updateCounterUseCase: UpdateCounterUseCase
  private deleteUserUseCase: DeleteUserUseCase
  private changePasswordUseCase: ChangePasswordUseCase

  constructor(
    createUserUseCase: CreateUserUseCase,
    createCounterUseCase: CreateCounterUseCase,
    updateCounterUseCase: UpdateCounterUseCase,
    deleteUserUseCase: DeleteUserUseCase,
    changePasswordUseCase: ChangePasswordUseCase
  ) {
    this.createUserUseCase = createUserUseCase
    this.createCounterUseCase = createCounterUseCase
    this.updateCounterUseCase = updateCounterUseCase,
    this.deleteUserUseCase = deleteUserUseCase,
    this.changePasswordUseCase = changePasswordUseCase
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
}
