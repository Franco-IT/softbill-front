import { errorProvider } from 'src/shared/providers'
import { IGetUserDTO } from '../dtos/IGetUserDTO'
import { IUserRepository } from '../repositories/IUserRepository'

export class FindByIDUseCase {
  private userRepository: IUserRepository

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  async execute(data: IGetUserDTO) {
    try {
      const response = await this.userRepository.findByID(data)

      return response.data
    } catch (error: any) {
      errorProvider.handle(error, {}, 'Erro ao buscar usuário, tente novamente mais tarde.')
    }
  }
}
