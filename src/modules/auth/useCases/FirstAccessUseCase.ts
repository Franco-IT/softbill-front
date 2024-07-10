import { errorProvider } from 'src/shared/providers'
import { IUserFirstAccessDTO } from '../dtos/IUserFirstAccessDTO'
import { IUserAuthRepository } from '../repositories/IUserAuthRepository'
import { AxiosResponse } from 'axios'

export class FirstAccessUseCase {
  private userAuthRepository: IUserAuthRepository

  constructor(userAuthRepository: IUserAuthRepository) {
    this.userAuthRepository = userAuthRepository
  }

  async execute(data: IUserFirstAccessDTO): Promise<AxiosResponse | undefined> {
    try {
      return await this.userAuthRepository.firtsAccess(data)
    } catch (error: any) {
      errorProvider.handle(error, {}, 'Erro ao realizar o primeiro acesso.')
    }
  }
}
