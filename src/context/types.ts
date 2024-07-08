import { IUserLoginDTO } from 'src/modules/auth/dtos/IUserLoginDTO'
import { IUserLoggedDTO } from 'src/modules/auth/dtos/IUserLoggedDTO'

export type ErrCallbackType = (err: { [key: string]: string }) => void

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: IUserLoggedDTO | null
  setLoading: (value: boolean) => void
  setUser: (value: IUserLoggedDTO | null) => void
  login: (params: IUserLoginDTO) => void
}
