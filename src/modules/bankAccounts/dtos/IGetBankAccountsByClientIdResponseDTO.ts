import { IBankAccountDTO } from './IBankAccountDTO'

export interface IGetBankAccountsByClientIdResponseDTO {
  page: number
  per_page: number
  pre_page: any
  next_page: any
  total: number
  total_pages: number
  data: IBankAccountDTO[]
}
