// DTOs
import { IChangeUserPasswordDTO } from '../dtos/IChangeUserPasswordDTO'
import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { IDeleteUserDTO } from '../dtos/IDeleteUserDTO'
import { IFirstAccessUserDTO } from '../dtos/IFirstAccessUserDTO'
import { IGetUserDTO } from '../dtos/IGetUserDTO'
import { IGetUsersDTO } from '../dtos/IGetUsersDTO'
import { ISetUserAvatarDTO } from '../dtos/ISetUserAvatarDTO'

// Use Cases
import { ChangePasswordUseCase } from '../useCases/ChangePasswordUseCase'
import { CreateUserUseCase } from '../useCases/CreateUserUseCase'
import { DeleteUserUseCase } from '../useCases/DeleteUserUseCase'
import { FindByIDUseCase } from '../useCases/FindByIDUseCase'
import { FirstAccessUserUseCase } from '../useCases/FirstAccessUserUseCase'
import { GetUsersUseCase } from '../useCases/GetUsersUseCase'
import { SetUserAvatarUseCase } from '../useCases/SetUserAvatarUseCase'
import { UpdateUserUseCase } from '../useCases/UpdateUserUseCase'
import { IUpdateUserDTO } from '../dtos/IUpdateUserDTO'

export class UserController {
  constructor(
    private getUsersUseCase: GetUsersUseCase,
    private findByIDUseCase: FindByIDUseCase,
    private createUserUseCase: CreateUserUseCase,
    private updateUserUseCase: UpdateUserUseCase,
    private deleteUserUseCase: DeleteUserUseCase,
    private changePasswordUseCase: ChangePasswordUseCase,
    private setUserAvatarUseCase: SetUserAvatarUseCase,
    private firstAccessUserUseCase: FirstAccessUserUseCase
  ) {}

  async findAll(params: IGetUsersDTO) {
    return this.getUsersUseCase.execute(params)
  }

  async findByID(data: IGetUserDTO) {
    return this.findByIDUseCase.execute(data)
  }

  async create(data: ICreateUserDTO) {
    return this.createUserUseCase.execute(data)
  }

  async update(data: IUpdateUserDTO) {
    return this.updateUserUseCase.execute(data)
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
