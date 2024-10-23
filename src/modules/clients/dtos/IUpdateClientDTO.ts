export interface IUpdateClientDTO {
  id: string
  name: string
  status: string
  email: string
  documentType: 'CNPJ'
  documentNumber: string
  additionalData: {
    fantasyName: string
    observations?: string
    collaboratorName: string
    clientCompanyPhone: string
    financialResponsible: string
  }
}
