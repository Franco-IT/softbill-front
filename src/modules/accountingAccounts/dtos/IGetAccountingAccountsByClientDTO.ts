export interface IGetAccountingAccountsByClientDTO {
  clientId: string
  params: {
    page: number
    perPage: number
    number: string
    search: string
    transactionType: string
  }
}
