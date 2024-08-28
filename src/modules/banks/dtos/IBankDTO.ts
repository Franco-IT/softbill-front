export interface IBankDTO {
  id: string
  name: string
  slug: string
  status: 'ACTIVE' | 'INACTIVE'
  createdAt: Date
  updatedAt: Date
}