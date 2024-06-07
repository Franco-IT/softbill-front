export type UserProps = {
  _id: string
  name: string
  email: string
  phone: string
  cellphone: string
  status: 'ACTIVE' | 'INACTIVE'
  type: 'ADMIN' | 'CLIENT' | 'ACCOUNTING'
  documentNumber: string
  documentType: 'CPF' | 'CNPJ' | 'OTHER'
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
