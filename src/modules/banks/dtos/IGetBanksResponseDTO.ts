import { IBankDTO } from './IBankDTO'

export interface IGetBanksResponseDTO {
  page: number
  perPage: number
  prePage: any
  nextPage: number
  total: number
  totalPages: number
  data: IBankDTO[]
}
