export interface IUserDTO {
  id: string
  name: string
  email: string
  phone: string
  cellphone: string
  status: 'ACTIVE' | 'INACTIVE' | 'BLOCKED'
  type: 'ADMIN' | 'CLIENT' | 'ACCOUNTING' | 'ACCOUNTANT'
  documentNumber: string
  documentType: 'CPF' | 'CNPJ' | 'OTHER'
  avatar: string
  createdAt: Date
}
