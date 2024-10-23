import { IAccountantDTO } from './IAccountantDTO'

export interface IGetAccountantsResponseDTO {
  page: number
  perPage: number
  prePage: number
  nextPage: any
  total: number
  totalPages: number
  data: IAccountantDTO[]
}
