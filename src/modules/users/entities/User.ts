import { IUserDTO } from '../dtos/IUserDTO'

export class User implements IUserDTO {
  _id: string
  name: string
  email: string
  phone: string
  cellphone: string
  status: 'ACTIVE' | 'INACTIVE' | 'BLOCKED'
  type: 'ADMIN' | 'CLIENT' | 'ACCOUNTING' | 'COUNTER'
  documentNumber: string
  documentType: 'CPF' | 'CNPJ' | 'OTHER'
  avatar: string
  createdAt: Date

  constructor(user: IUserDTO) {
    this._id = user._id
    this.name = user.name
    this.email = user.email
    this.phone = user.phone
    this.cellphone = user.cellphone
    this.status = user.status
    this.type = user.type
    this.documentNumber = user.documentNumber
    this.documentType = user.documentType
    this.avatar = user.avatar
    this.createdAt = user.createdAt
  }

  public getId(): string {
    return this._id
  }

  public getName(): string {
    return this.name
  }

  public getEmail(): string {
    return this.email
  }

  public getPhone(): string {
    return this.phone
  }

  public getCellphone(): string {
    return this.cellphone
  }

  public getStatus(): 'ACTIVE' | 'INACTIVE' | 'BLOCKED' {
    return this.status
  }

  public getType(): 'ADMIN' | 'CLIENT' | 'ACCOUNTING' | 'COUNTER' {
    return this.type
  }

  public getDocumentNumber(): string {
    return this.documentNumber
  }

  public getDocumentType(): 'CPF' | 'CNPJ' | 'OTHER' {
    return this.documentType
  }

  public getCreatedAt(): Date {
    return this.createdAt
  }

  public getAvatar(): string {
    return this.avatar
  }
}
