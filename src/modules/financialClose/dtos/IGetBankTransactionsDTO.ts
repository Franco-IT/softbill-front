export interface IGetBankTransactionsDTO {
  monthlyFinancialCloseId: string
  params: {
    page: number
    perPage: number
    search: string
    validated: string
    status: string
    transactionTypeConciliation: string
    bankAccountId: string
    step: string
  }
}
