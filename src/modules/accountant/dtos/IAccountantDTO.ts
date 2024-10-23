export interface IAccountantDTO {
  id: string
  name: string
  email: string
  phone: string
  cellphone: string
  status: 'ACTIVE' | 'INACTIVE' | 'BLOCKED'
  type: 'ACCOUNTANT'
  documentNumber: string
  documentType: 'CPF' | 'CNPJ' | 'OTHER'
  avatar: string
  accountingId: string
  createdAt: Date
}
