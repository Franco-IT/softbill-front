import { UserAuthRepository } from '../repositories/UserAuthRepository'
import { IUserLoginDTO, IUserLoginResponseDTO } from '../dtos/IUserLoginDTO'
import { errorProvider } from 'src/shared/providers'

export class LoginUseCase {
  private userAuthRepository: UserAuthRepository

  constructor(userAuthRepository: UserAuthRepository) {
    this.userAuthRepository = userAuthRepository
  }

  async execute(data: IUserLoginDTO): Promise<IUserLoginResponseDTO | undefined> {
    try {
      const response = await this.userAuthRepository.login(data)

      return response
    } catch (error: any) {
      throw errorProvider.handle(error, {}, 'E-mail ou senha incorretos, tente novamente.')
    }
  }
}
