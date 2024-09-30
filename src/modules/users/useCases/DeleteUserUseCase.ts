import { errorProvider } from 'src/shared/providers'
import { IDeleteUserDTO } from '../dtos/IDeleteUserDTO'
import { IUserRepository } from '../repositories/IUserRepository'

export class DeleteUserUseCase {
  private usersRepository: IUserRepository

  constructor(usersRepository: IUserRepository) {
    this.usersRepository = usersRepository
  }

  async execute(data: IDeleteUserDTO) {
    try {
      return this.usersRepository.delete(data)
    } catch (error: any) {
      throw errorProvider.handle(error, {}, 'Erro ao deletar usuário, tente novamente mais tarde.')
    }
  }
}
