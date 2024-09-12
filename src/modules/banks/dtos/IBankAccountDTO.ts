export interface IBankAccountDTO {
  id: string
  clientId: string
  bankId: string
  bankClientId: string
  bankClientSecret: string
  status: string
  bankHashCert: any
  bankHashKey: any
  accountNumber: string
  agencyNumber: string
  generatedBy: string
  bankOfxBranchId: any
  bankOfxAcctId: any
  createdAt: string
  updatedAt: string
  bank: Bank
}

export interface Bank {
  logo: string
  name: string
  id: string
  code: string
}
