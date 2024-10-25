// DTOs
import { ISetUserAvatarDTO } from '../dtos/ISetUserAvatarDTO'

// Repository
import { IUserRepository } from '../repositories/IUserRepository'

// Providers
import { errorProvider } from 'src/shared/providers'

export class SetUserAvatarUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: ISetUserAvatarDTO) {
    try {
      return await this.userRepository.setAvatar(data)
    } catch (error) {
      throw errorProvider.handle(error, {}, 'Erro ao enviar imagem, tente novamente mais tarde.')
    }
  }
}
