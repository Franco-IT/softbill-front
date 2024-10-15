export interface IBankDTO {
  id: string
  name: string
  slug: string
  status: 'ACTIVE' | 'INACTIVE'
  logo: string
  ispb: string
  code: string
  createdAt: Date
  updatedAt: Date
}
