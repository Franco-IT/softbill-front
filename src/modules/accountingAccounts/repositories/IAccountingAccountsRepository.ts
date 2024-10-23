// Interfaces
import { ICreateAccountingAccountDTO } from '../dtos/ICreateAccountingAccountDTO'
import { IGetAccountingAccountsByClientResponseDTO } from '../dtos/IGetAccountingAccountsByClientResponseDTO'
import { IGetAccountingAccountsByClientDTO } from '../dtos/IGetAccountingAccountsByClientDTO'
import { IDeleteAccountingAccountDTO } from '../dtos/IDeleteAccountingAccountDTO'
import { IUpdateAccountingAccountDTO } from '../dtos/IUpdateAccountingAccountDTO'

export interface IAccountingAccountsRepository {
  getAccountingAccountsByClient(
    data: IGetAccountingAccountsByClientDTO
  ): Promise<IGetAccountingAccountsByClientResponseDTO>
  createAccountingAccount(data: ICreateAccountingAccountDTO): Promise<void>
  updateAccountingAccount(data: IUpdateAccountingAccountDTO): Promise<void>
  deleteAccountingAccount(data: IDeleteAccountingAccountDTO): Promise<void>
}
