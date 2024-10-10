export interface Bank {
  logo: any
  name: string
  id: string
  code: string
}

export interface IBankAccountDTO {
  id: string
  client_id: string
  bank_id: string
  bank_client_id?: string
  bank_client_secret?: string
  status: string
  bank_hash_cert: any
  bank_hash_key: any
  account_number: string
  agency_number: string
  generated_by: string
  bank_ofx_branch_id: any
  bank_ofx_acct_id?: string
  createdAt: string
  updatedAt: string
  bank: Bank
}
