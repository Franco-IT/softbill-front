export interface IGetBankAccountsByClientIdDTO {
  id: string
  params: {
    page: number
    perPage: number
    search: string
    withBanks: boolean
  }
}
