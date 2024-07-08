import { UserAuth } from '../entities/UserAuth'
import { IUserAuthRepository } from './IUserAuthRepository'
import { IUserLoginDTO, IUserLoginResponseDTO } from '../dtos/IUserLoginDTO'
import { api } from '../../../services/api'
import authConfig from '../../../configs/auth'
import { IUserLoggedDTO } from '../dtos/IUserLoggedDTO'
import { IGetAuthUserDTO } from '../dtos/IGetAuthUserDTO'

export class UserAuthRepository implements IUserAuthRepository {
  async login(data: IUserLoginDTO): Promise<IUserLoginResponseDTO> {
    const response = await api.post(authConfig.loginEndpoint, data)
    const { token, userId } = response.data

    return { userId, token }
  }

  logout(): void {
    api.defaults.headers['Authorization'] = ''
  }

  async getAuthUser({ id }: IGetAuthUserDTO): Promise<IUserLoggedDTO> {
    const response = await api.get(`${authConfig.meEndpoint}/${id}`)

    const { data: userData } = response.data

    const user = new UserAuth({
      id: userData._id,
      role: userData.type,
      email: userData.email,
      name: userData.name,
      avatar: userData.avatar
    })

    return user
  }
}
