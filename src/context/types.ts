import { IUserLoginDTO } from 'src/modules/auth/dtos/IUserLoginDTO'
import { IUserLoggedDTO } from 'src/modules/auth/dtos/IUserLoggedDTO'
import { IUserResetPasswordDTO } from 'src/modules/auth/dtos/IUserResetPasswordDTO'
import { IUserEmailResetPasswordDTO } from 'src/modules/auth/dtos/IUserEmailResetPasswordDTO'
import { IUserFirstAccessDTO } from 'src/modules/auth/dtos/IUserFirstAccessDTO'

export type ErrCallbackType = (err: { [key: string]: string }) => void

export type AuthValuesType = {
  loading: boolean
  login: (params: IUserLoginDTO) => Promise<void>
  logout: () => void
  resetPassword: (params: IUserResetPasswordDTO) => Promise<void>
  emailResetPassword: (params: IUserEmailResetPasswordDTO) => Promise<void>
  firstAccess: (params: IUserFirstAccessDTO) => Promise<void>
  user: IUserLoggedDTO | null
  setLoading: (value: boolean) => void
  setUser: (value: IUserLoggedDTO | null) => void
}
