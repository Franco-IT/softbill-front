export interface IGetBankStatementDTO {
  monthlyFinancialCloseId: string
  params: {
    step: string
    page: number
    perPage: number
    Search: string
    bankAccountId: string
  }
}
