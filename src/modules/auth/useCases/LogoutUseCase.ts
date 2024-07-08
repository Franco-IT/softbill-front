import { errorProvider } from 'src/shared/providers'
import { UserAuthRepository } from '../repositories/UserAuthRepository'

export class LogoutUseCase {
  private userAuthRepository: UserAuthRepository

  constructor(userAuthRepository: UserAuthRepository) {
    this.userAuthRepository = userAuthRepository
  }

  execute(): void {
    try {
      this.userAuthRepository.logout()
    } catch (error: any) {
      errorProvider.handle(error, {}, 'Falha ao realizar logout, tente novamente mais tarde.')
    }
  }
}
