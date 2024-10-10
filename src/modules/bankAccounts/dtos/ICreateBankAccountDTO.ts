export interface ICreateBankAccountDTO {
  bankClientId: string
  bankClientSecret: string
  accountNumber: string
  agencyNumber: string
  cnpj?: string
  bankId: string
  clientId: string
  bankName: string
}
