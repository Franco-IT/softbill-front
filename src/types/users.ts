export interface UserProps {
  _id: string
  name: string
  email: string
  status: 'ACTIVE' | 'INACTIVE'
  type: 'ADMIN' | 'CLIENT' | 'ACCOUNTING'
  documentNumber: string
  documentType: 'CPF' | 'CNPJ' | 'OTHER'
  createdAt: Date
}

export interface UserListDataProps {
  page: number
  per_page: number
  pre_page: number | null
  next_page: number
  total: number
  total_pages: number
  data: UserProps[]
}

export interface UserDataProps {
  message: string
  data: UserProps
}
