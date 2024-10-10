// Services
import { api } from 'src/services/api'

// Interfaces
import { IAccountingAccountsRepository } from './IAccountingAccountsRepository'

// DTOs
import { ICreateAccountingAccountDTO } from '../dtos/ICreateAccountingAccountDTO'
import { IGetAccountingAccountsByClientResponseDTO } from '../dtos/IGetAccountingAccountsByClientResponseDTO'
import { IGetAccountingAccountsByClientDTO } from '../dtos/IGetAccountingAccountsByClientDTO'
import { IDeleteAccountingAccountDTO } from '../dtos/IDeleteAccountingAccountDTO'
import { IUpdateAccountingAccountDTO } from '../dtos/IUpdateAccountingAccountDTO'

export class AccountingAccountsRepository implements IAccountingAccountsRepository {
  async getAccountingAccountsByClient(
    data: IGetAccountingAccountsByClientDTO
  ): Promise<IGetAccountingAccountsByClientResponseDTO> {
    const cleanObject = <T extends object>(obj: T): { [p: string]: unknown } => {
      return Object.fromEntries(Object.entries(obj).filter(([, value]) => Boolean(value) || value === 0))
    }
    const response = await api.get('clientAccountingAccounts/by-client/' + data.clientId, {
      params: cleanObject(data.params)
    })

    return response.data
  }

  async createAccountingAccount(data: ICreateAccountingAccountDTO): Promise<void> {
    await api.post('clientAccountingAccounts', data)
  }

  async updateAccountingAccount(data: IUpdateAccountingAccountDTO): Promise<void> {
    const { clientAccountingAccountId, body } = data

    await api.put('clientAccountingAccounts/' + clientAccountingAccountId, body)
  }

  async deleteAccountingAccount(data: IDeleteAccountingAccountDTO): Promise<void> {
    await api.delete('clientAccountingAccounts/' + data.clientAccountingAccountId)
  }
}
