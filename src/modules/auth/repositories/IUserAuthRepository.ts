import { IUserLoginDTO, IUserLoginResponseDTO } from '../dtos/IUserLoginDTO'
import { IUserLoggedDTO } from '../dtos/IUserLoggedDTO'
import { IGetAuthUserDTO } from '../dtos/IGetAuthUserDTO'

export interface IUserAuthRepository {
  login(data: IUserLoginDTO): Promise<IUserLoginResponseDTO>
  logout(): void
  getAuthUser(data: IGetAuthUserDTO): Promise<IUserLoggedDTO>
}
