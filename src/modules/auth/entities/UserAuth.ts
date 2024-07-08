import { IUserLoggedDTO } from '../dtos/IUserLoggedDTO'

export class UserAuth implements IUserLoggedDTO {
  public id: string
  public role: string
  public email: string
  public name: string
  public avatar: string | null

  constructor({ id, role, email, name, avatar }: IUserLoggedDTO) {
    this.id = id
    this.role = role
    this.email = email
    this.name = name
    this.avatar = avatar ?? null
  }

  public getId(): string {
    return this.id
  }

  public getRole(): string {
    return this.role
  }

  public getEmail(): string {
    return this.email
  }

  public getName(): string {
    return this.name
  }

  public getAvatar(): string | null {
    return this.avatar
  }
}
