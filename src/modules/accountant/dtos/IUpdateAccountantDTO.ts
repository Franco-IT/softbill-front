export interface IUpdateAccountantDTO {
  id: string
  email: string
  name: string
  status: 'ACTIVE' | 'INACTIVE' | 'BLOCKED'
}
