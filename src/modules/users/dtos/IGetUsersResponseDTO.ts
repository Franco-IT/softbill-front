import { IUserDTO } from './IUserDTO'

export interface IGetUsersResponseDTO {
  page: number
  perPage: number
  prePage: number
  nextPage: any
  total: number
  totalPages: number
  data: IUserDTO[]
}
