export interface IUpdateBankTransactionDTO {
  transactionId: string
  reqBody: {
    conciliationDescription: string
    creditAccount?: string
    debitAccount?: string
    accountingAccountDescription: string
  }
}
