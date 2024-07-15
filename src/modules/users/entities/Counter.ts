import { ICounterDTO } from '../dtos/ICounterDTO'
import { User } from './User'

export class Counter extends User {
  accountingId: string

  constructor(counter: ICounterDTO) {
    super(counter)
    this.accountingId = counter.accountingId
  }

  public getAccountingId(): string {
    return this.accountingId
  }

  public getId(): string {
    return this.id
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

  public getStatus(): 'ACTIVE' | 'INACTIVE' {
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
}
