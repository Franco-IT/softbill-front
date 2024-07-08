import { errorProvider } from 'src/shared/providers'
import { IUserLoggedDTO } from '../dtos/IUserLoggedDTO'
import { IUserAuthRepository } from '../repositories/IUserAuthRepository'

export class GetAuthUserUseCase {
  private userAuthRepository: IUserAuthRepository

  constructor(userAthRepository: IUserAuthRepository) {
    this.userAuthRepository = userAthRepository
  }

  async execute(id: string): Promise<IUserLoggedDTO | undefined> {
    try {
      return await this.userAuthRepository.getAuthUser({ id })
    } catch (error: any) {
      errorProvider.handle(error, {}, 'Sua sessão expirou, faça login novamente.')
    }
  }
}
