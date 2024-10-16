import { IAccountingDTO } from './IAccountingDTO'

export interface IGetAccountingsResponseDTO {
  page: number
  perPage: number
  prePage: number
  nextPage: any
  total: number
  totalPages: number
  data: IAccountingDTO[]
}
