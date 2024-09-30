import { errorProvider } from 'src/shared/providers'
import { IFirstAccessUserDTO } from '../dtos/IFirstAccessUserDTO'
import { IUserRepository } from '../repositories/IUserRepository'
import { AxiosResponse } from 'axios'

export class FirstAccessUserUseCase {
  private userRepository: IUserRepository

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  async execute(data: IFirstAccessUserDTO): Promise<AxiosResponse | undefined> {
    try {
      return this.userRepository.firstAccess(data)
    } catch (error: any) {
      throw errorProvider.handle(error, {}, 'Erro ao realizar o primeiro acesso.')
    }
  }
}
