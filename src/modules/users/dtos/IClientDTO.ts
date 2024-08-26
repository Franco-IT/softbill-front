import { IUserDTO } from './IUserDTO'

export interface IClientDTO extends IUserDTO {
  additionalData: {
    accountingId: string
    clientCompanyPhone: string
    collaboratorName: string
    financialResponsible: string
    fantasyName: string
    observations: string
  }
}
