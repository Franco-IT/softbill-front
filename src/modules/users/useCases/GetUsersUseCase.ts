import { errorProvider } from 'src/shared/providers'
import { IGetUsersDTO } from '../dtos/IGetUsersDTO'
import { IUserRepository } from '../repositories/IUserRepository'

export class GetUsersUseCase {
  private userRepository: IUserRepository

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  async execute(params: IGetUsersDTO) {
    try {
      const response = await this.userRepository.getUsers(params)

      return response.data
    } catch (error: any) {
      throw errorProvider.handle(error, {}, 'Erro ao buscar usuários, tente novamente mais tarde.')
    }
  }
}
