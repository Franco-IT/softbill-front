import { IChangeUserPasswordDTO } from '../dtos/IChangeUserPasswordDTO'
import { ICreateClientDTO } from '../dtos/ICreateClientDTO'
import { ICreateCounterDTO } from '../dtos/ICreateCounterDTO'
import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { IDeleteUserDTO } from '../dtos/IDeleteUserDTO'
import { IFirstAccessUserDTO } from '../dtos/IFirstAccessUserDTO'
import { IGetClientsDTO } from '../dtos/IGetClientsDTO'
import { IGetUserDTO } from '../dtos/IGetUserDTO'
import { IGetUsersDTO } from '../dtos/IGetUsersDTO'
import { ISetUserAvatarDTO } from '../dtos/ISetUserAvatarDTO'
import { IUpdateClientDTO } from '../dtos/IUpdateClientDTO'
import { IUpdateCounterDTO } from '../dtos/IUpdateCounterDTO'
import { ChangePasswordUseCase } from '../useCases/ChangePasswordUseCase'
import { CreateClientUseCase } from '../useCases/CreateClientUseCase'
import { CreateCounterUseCase } from '../useCases/CreateCounterUseCase'
import { CreateUserUseCase } from '../useCases/CreateUserUseCase'
import { DeleteUserUseCase } from '../useCases/DeleteUserUseCase'
import { FindByIDUseCase } from '../useCases/FindByIDUseCase'
import { FirstAccessUserUseCase } from '../useCases/FirstAccessUserUseCase'
import { GetClientsUseCase } from '../useCases/GetClientsUseCase'
import { GetUsersUseCase } from '../useCases/GetUsersUseCase'
import { SetUserAvatarUseCase } from '../useCases/SetUserAvatarUseCase'
import { UpdateClientUseCase } from '../useCases/UpdateClientUseCase'
import { UpdateCounterUseCase } from '../useCases/UpdateCounterUseCase'

export class UserController {
  private getUsersUseCase: GetUsersUseCase
  private getClientsUseCase: GetClientsUseCase
  private findByIDUseCase: FindByIDUseCase
  private createUserUseCase: CreateUserUseCase
  private createClientUseCase: CreateClientUseCase
  private createCounterUseCase: CreateCounterUseCase
  private updateCounterUseCase: UpdateCounterUseCase
  private updateClientUseCase: UpdateClientUseCase
  private deleteUserUseCase: DeleteUserUseCase
  private changePasswordUseCase: ChangePasswordUseCase
  private setUserAvatarUseCase: SetUserAvatarUseCase
  private firstAccessUserUseCase: FirstAccessUserUseCase

  constructor(
    getUsersUseCase: GetUsersUseCase,
    getClientsUseCase: GetClientsUseCase,
    findByIDUseCase: FindByIDUseCase,
    createUserUseCase: CreateUserUseCase,
    createClientUseCase: CreateClientUseCase,
    createCounterUseCase: CreateCounterUseCase,
    updateCounterUseCase: UpdateCounterUseCase,
    updateClientUseCase: UpdateClientUseCase,
    deleteUserUseCase: DeleteUserUseCase,
    changePasswordUseCase: ChangePasswordUseCase,
    setUserAvatarUseCase: SetUserAvatarUseCase,
    firstAccessUserUseCase: FirstAccessUserUseCase
  ) {
    ;(this.getUsersUseCase = getUsersUseCase),
      (this.getClientsUseCase = getClientsUseCase),
      (this.findByIDUseCase = findByIDUseCase),
      (this.createUserUseCase = createUserUseCase),
      (this.createClientUseCase = createClientUseCase),
      (this.createCounterUseCase = createCounterUseCase),
      (this.updateCounterUseCase = updateCounterUseCase),
      (this.updateClientUseCase = updateClientUseCase),
      (this.deleteUserUseCase = deleteUserUseCase),
      (this.changePasswordUseCase = changePasswordUseCase),
      (this.setUserAvatarUseCase = setUserAvatarUseCase),
      (this.firstAccessUserUseCase = firstAccessUserUseCase)
  }

  async getUsers(params: IGetUsersDTO) {
    return this.getUsersUseCase.execute(params)
  }

  async getClients(params: IGetClientsDTO) {
    return this.getClientsUseCase.execute(params)
  }

  async findByID(data: IGetUserDTO) {
    return this.findByIDUseCase.execute(data)
  }

  async create(data: ICreateUserDTO) {
    return this.createUserUseCase.execute(data)
  }

  async createClient(data: ICreateClientDTO) {
    return this.createClientUseCase.execute(data)
  }

  async createCounter(data: ICreateCounterDTO) {
    return this.createCounterUseCase.execute(data)
  }

  async updateCounter(data: IUpdateCounterDTO) {
    return this.updateCounterUseCase.execute(data)
  }

  async updateClient(data: IUpdateClientDTO) {
    return this.updateClientUseCase.execute(data)
  }

  async delete(data: IDeleteUserDTO) {
    return this.deleteUserUseCase.execute(data)
  }

  async changePassword(data: IChangeUserPasswordDTO) {
    return this.changePasswordUseCase.execute(data)
  }

  async setAvatar(data: ISetUserAvatarDTO) {
    return this.setUserAvatarUseCase.execute(data)
  }

  async firstAccess(data: IFirstAccessUserDTO) {
    return this.firstAccessUserUseCase.execute(data)
  }
}
