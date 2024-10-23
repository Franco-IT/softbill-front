// DTOs
import { ICreateAccountingDTO } from '../dtos/ICreateAccountingDTO'
import { IUpdateAccountingDTO } from '../dtos/IUpdateAccountingDTO'
import { IGetAccountingsDTO } from '../dtos/IGetAccountingsDTO'
import { IGetAccountingDTO } from '../dtos/IGetAccountingDTO'
import { IAccountingDTO } from '../dtos/IAccountingDTO'
import { IDeleteAccountingDTO } from '../dtos/IDeleteAccountingDTO'
import { IGetAccountingsResponseDTO } from '../dtos/IGetAccountingsResponseDTO'

export interface IAccountingsRepository {
  findByID(params: IGetAccountingDTO): Promise<IAccountingDTO>
  create(data: ICreateAccountingDTO): Promise<void>
  update(data: IUpdateAccountingDTO): Promise<void>
  delete(data: IDeleteAccountingDTO): Promise<void>
  findAll(params: IGetAccountingsDTO): Promise<IGetAccountingsResponseDTO>
}
