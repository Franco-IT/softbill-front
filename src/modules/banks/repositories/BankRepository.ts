// Repositories
import { IBankRepository } from './IBankRepository'

// DTOs
import { IGetBanksDTO } from '../dtos/IGetBanksDTO'
import { ISetBankLogoDTO } from '../dtos/ISetBankLogoDTO'
import { IChangeBankStatusDTO } from '../dtos/IChangeBankStatusDTO'
import { IChangeBankDisponibility } from '../dtos/IChangeBankDisponibility'
import { IGetBanksResponseDTO } from '../dtos/IGetBanksResponseDTO'

// Services
import { api } from 'src/services/api'

export class BankRepository implements IBankRepository {
  async setBankLogo(data: ISetBankLogoDTO): Promise<void> {
    await api.post('/files', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  async getBanks(params: IGetBanksDTO): Promise<IGetBanksResponseDTO> {
    const response = await api.get('/banks', { params })

    return response.data
  }

  async changeBankStatus(data: IChangeBankStatusDTO): Promise<void> {
    const { id, status } = data

    await api.put(`/banks/${id}`, { status })
  }

  async changeBankDisponibility(data: IChangeBankDisponibility): Promise<void> {
    const { id, integrated } = data

    await api.put(`/banks/${id}`, { integrated })
  }
}
