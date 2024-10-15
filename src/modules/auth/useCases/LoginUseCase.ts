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
      return this.userAuthRepository.login(data)
    } catch (error: any) {
      throw errorProvider.handle(error, errors, 'E-mail ou senha incorretos, tente novamente.')
    }
  }
}
