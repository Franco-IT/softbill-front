// Entities
import { UserAuth } from '../entities/UserAuth'

// DTOs
import { IUserLoggedDTO } from '../dtos/IUserLoggedDTO'
import { IGetAuthUserDTO } from '../dtos/IGetAuthUserDTO'
import { IUserFirstAccessDTO } from '../dtos/IUserFirstAccessDTO'
import { IUserResetPasswordDTO } from '../dtos/IUserResetPasswordDTO'
import { IChangePasswordAuthUserDTO } from '../dtos/IChangePasswordAuthUserDTO'
import { IUserLoginDTO, IUserLoginResponseDTO } from '../dtos/IUserLoginDTO'
import { IUserEmailResetPasswordDTO } from '../dtos/IUserEmailResetPasswordDTO'

// Repositories
import { IUserAuthRepository } from './IUserAuthRepository'

// Services
import { api } from 'src/services/api'

// Configurations
import authConfig from 'src/configs/auth'

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

    return new UserAuth({
      id: userData.id,
      role: userData.type,
      email: userData.email,
      name: userData.name,
      avatar: userData.avatar
    })
  }

  async changePassword(data: IChangePasswordAuthUserDTO): Promise<void> {
    await api.put('/auth/change-password', data)
  }

  async firtsAccess({ newPassword, confirmPassword, token }: IUserFirstAccessDTO): Promise<void> {
    await api.post(
      '/auth/reset-password',
      { newPassword, confirmPassword },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  }

  async emailResetPassword(data: IUserEmailResetPasswordDTO): Promise<void> {
    await api.post('/auth/email-reset-password', data)
  }

  async resetPassword({ newPassword, confirmPassword, token }: IUserResetPasswordDTO): Promise<void> {
    await api.post(
      '/auth/reset-password',
      {
        newPassword,
        confirmPassword
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  }
}
