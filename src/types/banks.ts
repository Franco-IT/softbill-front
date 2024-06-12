export type BankProps = {
  _id: string
  name: string
  slug: string
  status: 'ACTIVE' | 'INACTIVE'
  createdAt: Date
}

export type BankListDataProps = {
  page: number
  per_page: number
  pre_page: number | null
  next_page: number
  total: number
  total_pages: number
  data: BankProps[]
}

export type BankDataProps = {
  message: string
  data: BankProps
}

export type BankAccountProps = {
  _id: string
  bankClientId: string
  bankClientSecret: string
  accountNumber: string
  agencyNumber: string
  bankId: string
  clientId: string
  createdAt: Date
  status: 'ACTIVE' | 'INACTIVE'
  bank: BankProps
}

export type BankAccountListDataProps = {
  page: number
  per_page: number
  pre_page: number | null
  next_page: number
  total: number
  total_pages: number
  data: BankAccountProps[]
}
