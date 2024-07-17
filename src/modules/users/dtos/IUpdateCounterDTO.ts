export interface IUpdateCounterDTO {
  id: string
  email: string
  name: string
  status: 'ACTIVE' | 'INACTIVE' | 'BLOCKED'
}
