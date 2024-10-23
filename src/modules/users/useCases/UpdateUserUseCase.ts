import { errorProvider } from 'src/shared/providers'
import { IUpdateUserDTO } from '../dtos/IUpdateUserDTO'
import { IUserRepository } from '../repositories/IUserRepository'
import { errors } from '../errors'

export class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: IUpdateUserDTO) {
    try {
      await this.userRepository.update(data)
    } catch (e) {
      throw errorProvider.handle(e, errors, 'Erro ao atualizar o usuário, tente novamente mais tarde.')
    }
  }
}
