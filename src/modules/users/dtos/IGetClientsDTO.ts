import { IGetUsersDTO } from "./IGetUsersDTO";

export interface IGetClientsDTO extends IGetUsersDTO {
  accountingId: string
}