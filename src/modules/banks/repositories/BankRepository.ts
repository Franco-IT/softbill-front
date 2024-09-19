import { IBankRepository } from './IBankRepository'
import { IGetBanksDTO } from '../dtos/IGetBanksDTO'
import { ISetBankLogoDTO } from '../dtos/ISetBankLogoDTO'
import { ILinkingBankDTO } from '../dtos/ILinkingBankDTO'
import { IChangeBankStatusDTO } from '../dtos/IChangeBankStatusDTO'
import { IGetBanksByClientIdDTO } from '../dtos/IGetBanksByClientIdDTO'

import { AxiosResponse } from 'axios'
import { api } from 'src/services/api'
import { IChangeBankDisponibility } from '../dtos/IChangeBankDisponibility'

export class BankRepository implements IBankRepository {
  async setBankLogo(data: ISetBankLogoDTO): Promise<AxiosResponse> {
    return api.post('/files', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  async getBanks(params: IGetBanksDTO): Promise<AxiosResponse> {
    return api.get('/banks', { params })
  }

  async getBanksByClientId(data: IGetBanksByClientIdDTO): Promise<AxiosResponse> {
    const { id, params } = data

    return api.get(`/bankAccounts/by-client/${id}`, {
      params
    })
  }

  async changeBankStatus(data: IChangeBankStatusDTO): Promise<AxiosResponse> {
    const { id, status } = data

    return api.put(`/banks/${id}`, { status })
  }

  async changeBankDisponibility(data: IChangeBankDisponibility): Promise<AxiosResponse> {
    const { id, integrated } = data

    return api.put(`/banks/${id}`, { integrated })
  }

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
