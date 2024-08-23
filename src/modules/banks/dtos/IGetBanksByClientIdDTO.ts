export interface IGetBanksByClientIdDTO {
  id: string
  params: {
    page: number
    perPage: number
    search: string
    withBanks: boolean
  }
}
