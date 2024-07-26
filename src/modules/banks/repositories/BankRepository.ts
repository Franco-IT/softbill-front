import { AxiosResponse } from 'axios'
import { ILinkingBankDTO } from '../dtos/ILinkingBankDTO'
import { IBankRepository } from './IBankRepository'
import { api } from 'src/services/api'

export class BankRepository implements IBankRepository {
  async linkingBank(data: ILinkingBankDTO): Promise<AxiosResponse> {
    const formData = new FormData()
    formData.append('clientId', data.clientId)
    formData.append('bankId', data.bankId)
    formData.append('bankClientId', data.bankClientId)
    formData.append('bankClientSecret', data.bankClientSecret)
    formData.append('accountNumber', data.accountNumber)
    formData.append('agencyNumber', data.agencyNumber)

    return api.post('/bankAccounts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
