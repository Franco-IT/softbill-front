export type ClientProps = {
  _id: string
  name: string
  email: string
  phone: string
  cellphone: string
  cep: string
  address: string
  neighborhood: string
  city: string
  state: string
  number: number
  complement: string
  type: 'CLIENT'
  status: 'ACTIVE' | 'INACTIVE'
  accountingId: string
  documentNumber: string
  documentType: 'CPF' | 'CNPJ' | 'OTHER'
  createdAt: Date
  updatedAt: Date
}

export type ClientsListProps = {
  page: number
  per_page: number
  pre_page: number | null
  next_page: number
  total: number
  total_pages: number
  data: ClientProps[]
}

export type ClientDataProps = {
  message: string
  data: ClientProps
}
