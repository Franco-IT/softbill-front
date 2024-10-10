import { IAccountingAccountDTO } from './IAccountingAccountDTO'

export interface IGetAccountingAccountsByClientResponseDTO {
  page: number
  perPage: number
  prePage: number | null
  nextPage: number | null
  total: number
  totalPages: number
  data: IAccountingAccountDTO[]
}
