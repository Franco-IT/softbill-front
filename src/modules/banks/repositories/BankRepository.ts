import { IBankRepository } from './IBankRepository'
import { IGetBanksDTO } from '../dtos/IGetBanksDTO'
import { ISetBankLogoDTO } from '../dtos/ISetBankLogoDTO'
import { IChangeBankStatusDTO } from '../dtos/IChangeBankStatusDTO'

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

  async changeBankStatus(data: IChangeBankStatusDTO): Promise<AxiosResponse> {
    const { id, status } = data

    return api.put(`/banks/${id}`, { status })
  }

  async changeBankDisponibility(data: IChangeBankDisponibility): Promise<AxiosResponse> {
    const { id, integrated } = data

    return api.put(`/banks/${id}`, { integrated })
  }
}
