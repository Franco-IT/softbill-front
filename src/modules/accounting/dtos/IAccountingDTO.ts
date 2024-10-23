export interface IAccountingDTO {
  id: string
  name: string
  email: string
  phone: string
  cellphone: string
  status: 'ACTIVE' | 'INACTIVE' | 'BLOCKED'
  type: 'ACCOUNTING'
  documentNumber: string
  documentType: 'CPF' | 'CNPJ' | 'OTHER'
  avatar: string
  createdAt: Date
}
