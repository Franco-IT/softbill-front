export interface IUpdateUserDTO {
  id: string
  email: string
  name: string
  status: 'ACTIVE' | 'INACTIVE' | 'BLOCKED'
}
