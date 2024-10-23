// DTOs
import { ICreateAccountantDTO } from '../dtos/ICreateAccountantDTO'
import { IUpdateAccountantDTO } from '../dtos/IUpdateAccountantDTO'
import { IGetAccountantsDTO } from '../dtos/IGetAccountantsDTO'
import { IGetAccountantDTO } from '../dtos/IGetAccountantDTO'
import { IAccountantDTO } from '../dtos/IAccountantDTO'
import { IDeleteAccountantDTO } from '../dtos/IDeleteAccountantDTO'
import { IGetAccountantsResponseDTO } from '../dtos/IGetAccountantsResponseDTO'

export interface IAccountantsRepository {
  findByID(params: IGetAccountantDTO): Promise<IAccountantDTO>
  create(data: ICreateAccountantDTO): Promise<void>
  update(data: IUpdateAccountantDTO): Promise<void>
  delete(data: IDeleteAccountantDTO): Promise<void>
  findAll(params: IGetAccountantsDTO): Promise<IGetAccountantsResponseDTO>
}
