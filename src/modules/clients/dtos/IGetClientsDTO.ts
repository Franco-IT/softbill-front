export interface IGetClientsDTO {
  type: 'CLIENT'
  page: number
  perPage: number
  search: string
  accountingId: string
}
