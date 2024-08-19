export interface IUserDTO {
  _id: string
  name: string
  email: string
  phone: string
  cellphone: string
  status: 'ACTIVE' | 'INACTIVE' | 'BLOCKED'
  type: 'ADMIN' | 'CLIENT' | 'ACCOUNTING' | 'COUNTER'
  documentNumber: string
  documentType: 'CPF' | 'CNPJ' | 'OTHER'
  avatar: string
  createdAt: Date
}
