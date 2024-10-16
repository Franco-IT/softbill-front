export interface IUpdateAccountingDTO {
  id: string
  email: string
  name: string
  status: 'ACTIVE' | 'INACTIVE' | 'BLOCKED'
}
