export type UserProps = {
  id: string
  name: string
  email: string
  phone: string
  cellphone: string
  status: 'ACTIVE' | 'INACTIVE' | 'BLOCKED'
  type: 'ADMIN' | 'CLIENT' | 'ACCOUNTING' | 'COUNTER'
  documentNumber: string
  documentType: 'CPF' | 'CNPJ' | 'OTHER'
  avatar: string | null
  createdAt: Date
}

export type UserListDataProps = {
  page: number
  per_page: number
  pre_page: number | null
  next_page: number
  total: number
  total_pages: number
  data: UserProps[]
}

export type UserDataProps = {
  message: string
  data: UserProps
}
