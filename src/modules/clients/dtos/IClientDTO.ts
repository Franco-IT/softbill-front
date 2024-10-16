export interface IClientDTO {
  id: string
  name: string
  email: string
  phone: string
  cellphone: string
  status: 'ACTIVE' | 'INACTIVE' | 'BLOCKED'
  type: 'CLIENT'
  documentNumber: string
  documentType: 'CNPJ'
  avatar: string
  additionalData: {
    accountingId: string
    clientCompanyPhone: string
    collaboratorName: string
    financialResponsible: string
    fantasyName: string
    observations: string
  }
  createdAt: Date
}
