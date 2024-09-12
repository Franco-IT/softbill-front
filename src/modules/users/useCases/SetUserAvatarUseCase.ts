import { AxiosResponse } from 'axios'
import { ISetUserAvatarDTO } from '../dtos/ISetUserAvatarDTO'
import { IUserRepository } from '../repositories/IUserRepository'
import { errorProvider } from 'src/shared/providers'

export class SetUserAvatarUseCase {
  private userRepository: IUserRepository

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  async execute(data: ISetUserAvatarDTO): Promise<AxiosResponse | undefined> {
    try {
      return this.userRepository.setAvatar(data)
    } catch (error: any) {
      errorProvider.handle(error, {}, 'Erro ao enviar imagem, tente novamente mais tarde.')
    }
  }
}
