export interface IBankDTO {
  id: string
  name: string
  slug: string
  status: 'ACTIVE' | 'INACTIVE'
  logo: string
  createdAt: Date
  updatedAt: Date
}
