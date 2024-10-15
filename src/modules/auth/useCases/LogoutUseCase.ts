// Providers
import { errorProvider } from 'src/shared/providers'

// Repositories
import { UserAuthRepository } from '../repositories/UserAuthRepository'

export class LogoutUseCase {
  constructor(private userAuthRepository: UserAuthRepository) {}

  execute() {
    try {
      this.userAuthRepository.logout()
    } catch (error: any) {
      throw errorProvider.handle(error, {}, 'Falha ao realizar logout, tente novamente mais tarde.')
    }
  }
}
