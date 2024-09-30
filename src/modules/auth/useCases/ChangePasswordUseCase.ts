import { errorProvider } from 'src/shared/providers'
import { IChangePasswordAuthUserDTO } from '../dtos/IChangePasswordAuthUserDTO'
import { IUserAuthRepository } from '../repositories/IUserAuthRepository'

export class ChangePasswordUseCase {
  private userAuthRepository: IUserAuthRepository

  constructor(userAuthRepository: IUserAuthRepository) {
    this.userAuthRepository = userAuthRepository
  }

  async execute(data: IChangePasswordAuthUserDTO) {
    try {
      return await this.userAuthRepository.changePassword(data)
    } catch (error: any) {
      throw errorProvider.handle(error, {}, 'Ocorreu um erro ao alterar a senha.')
    }
  }
}
