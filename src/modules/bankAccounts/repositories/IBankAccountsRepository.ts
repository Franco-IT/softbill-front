// DTOs
import { IGetBankAccountsByClientIdResponseDTO } from '../dtos/IGetBankAccountsByClientIdResponseDTO'
import { IGetBankAccountsByClientIdDTO } from '../dtos/IGetBankAccountsByClientIdDTO'
import { ICreateBankAccountDTO } from '../dtos/ICreateBankAccountDTO'
import { IDeleteBankAccountDTO } from '../dtos/IDeleteBankAccountDTO'

export interface IBankAccountsRepository {
  getBankAccountsByClientId(data: IGetBankAccountsByClientIdDTO): Promise<IGetBankAccountsByClientIdResponseDTO>
  createBankAccount(data: ICreateBankAccountDTO): Promise<void>
  deleteBankAccount(data: IDeleteBankAccountDTO): Promise<void>
}
