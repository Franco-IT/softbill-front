// Data Transfer Objects (DTOs)
import { IGetBankAccountsByClientIdDTO } from '../dtos/IGetBankAccountsByClientIdDTO'
import { IGetBankAccountsByClientIdResponseDTO } from '../dtos/IGetBankAccountsByClientIdResponseDTO'
import { ICreateBankAccountDTO } from '../dtos/ICreateBankAccountDTO'
import { IDeleteBankAccountDTO } from '../dtos/IDeleteBankAccountDTO'

// Repository
import { IBankAccountsRepository } from './IBankAccountsRepository'

// Services
import { api } from 'src/services/api'

export class BankAccountsRepository implements IBankAccountsRepository {
  async getBankAccountsByClientId(data: IGetBankAccountsByClientIdDTO): Promise<IGetBankAccountsByClientIdResponseDTO> {
    const { id, params } = data

    const response = await api.get('bankAccounts/by-client/' + id, {
      params
    })

    return response.data
  }

  async createBankAccount(data: ICreateBankAccountDTO): Promise<void> {
    const formData = new FormData()
    const dataKeys = Object.keys(data) as Array<keyof ICreateBankAccountDTO>
    for (const key of dataKeys) {
      if (data[key] !== undefined) formData.append(key, String(data[key]))
    }

    return api.post('bankAccounts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  async deleteBankAccount(data: IDeleteBankAccountDTO): Promise<void> {
    await api.delete('bankAccounts/' + data.id)
  }
}
