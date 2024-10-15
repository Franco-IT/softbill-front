// Providers
import { errorProvider } from 'src/shared/providers'

// Repositories
import { IUserAuthRepository } from '../repositories/IUserAuthRepository'

// Errors
import { errors } from '../erros'

export class GetAuthUserUseCase {
  constructor(private userAuthRepository: IUserAuthRepository) {}

  async execute(id: string) {
    try {
      return this.userAuthRepository.getAuthUser({ id })
    } catch (error) {
      throw errorProvider.handle(error, errors, 'Sua sessão expirou, faça login novamente.')
    }
  }
}
