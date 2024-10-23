export interface Bank {
  logo: any
  name: string
  id: string
  code: string
}

export interface IBankAccountDTO {
  id: string
  clientId: string
  bankId: string
  bankClientId?: string
  bankClientSecret?: string
  status: string
  bankHashCert: any
  bankHashKey: any
  accountNumber: string
  agencyNumber: string
  generatedBy: string
  bankOFXBranchId: any
  bankOFXAcctId?: string
  createdAt: string
  updatedAt: string
  bank: Bank
}
