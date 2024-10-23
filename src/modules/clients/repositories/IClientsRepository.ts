// DTOs
import { ICreateClientDTO } from '../dtos/ICreateClientDTO'
import { IUpdateClientDTO } from '../dtos/IUpdateClientDTO'
import { IGetClientsDTO } from '../dtos/IGetClientsDTO'
import { IGetClientDTO } from '../dtos/IGetClientDTO'
import { IClientDTO } from '../dtos/IClientDTO'
import { IDeleteClientDTO } from '../dtos/IDeleteClientDTO'
import { IGetClientsResponseDTO } from '../dtos/IGetClientsResponseDTO'

export interface IClientsRepository {
  findByID(params: IGetClientDTO): Promise<IClientDTO>
  create(data: ICreateClientDTO): Promise<void>
  update(data: IUpdateClientDTO): Promise<void>
  delete(data: IDeleteClientDTO): Promise<void>
  findAll(params: IGetClientsDTO): Promise<IGetClientsResponseDTO>
}
