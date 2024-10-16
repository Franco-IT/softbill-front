import { IClientDTO } from './IClientDTO'

export interface IGetClientsResponseDTO {
  page: number
  perPage: number
  prePage: number
  nextPage: any
  total: number
  totalPages: number
  data: IClientDTO[]
}
