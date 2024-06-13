import { UserProps } from './users'

export type ClientProps = UserProps & {
  type: 'CLIENT'
  additionalData: {
    accountingId: string
    clientCompanyPhone: string
    collaboratorName: string
    financialResponsible: string
    fantasyName: string
    observations: string
  }
  updatedAt: string
  _id: string
  __v: number
  'type#status'?: string
}

export type ClientsListProps = {
  page: number
  per_page: number
  pre_page: number | null
  next_page: number
  total: number
  total_pages: number
  data: ClientProps[]
}

export type ClientDataProps = {
  message: string
  data: ClientProps
}
