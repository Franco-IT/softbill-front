import { ICreateUserDTO } from './ICreateUserDTO'

export interface ICreateCounterDTO extends ICreateUserDTO {
  accountingId: string
}
