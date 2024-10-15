// Providers
import { errorProvider } from 'src/shared/providers'

// Errors
import { errors } from '../erros'

// DTOs
import { IUserLoginDTO, IUserLoginResponseDTO } from '../dtos/IUserLoginDTO'

// Repositories
import { UserAuthRepository } from '../repositories/UserAuthRepository'

export class LoginUseCase {
  constructor(private userAuthRepository: UserAuthRepository) {}

  async execute(data: IUserLoginDTO): Promise<IUserLoginResponseDTO> {
    try {
      return await this.userAuthRepository.login(data)
    } catch (error) {
      throw errorProvider.handle(error, errors, 'Ocorreu um erro ao realizar o login, tente novamente.')
    }
  }
}
