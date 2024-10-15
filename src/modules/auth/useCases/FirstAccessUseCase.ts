// Providers
import { errorProvider } from 'src/shared/providers'

// DTOs
import { IUserFirstAccessDTO } from '../dtos/IUserFirstAccessDTO'

// Repositories
import { IUserAuthRepository } from '../repositories/IUserAuthRepository'

// Errors
import { errors } from '../erros'

export class FirstAccessUseCase {
  constructor(private userAuthRepository: IUserAuthRepository) {}

  async execute(data: IUserFirstAccessDTO) {
    try {
      await this.userAuthRepository.firtsAccess(data)
    } catch (error) {
      throw errorProvider.handle(error, errors, 'Erro ao realizar o primeiro acesso, tente novamente mais tarde.')
    }
  }
}
