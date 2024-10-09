export interface IUpdateAccountingAccountDTO {
  clientAccountingAccountId: string
  body: {
    number: string
    description: string
    transactionType: string
  }
}
