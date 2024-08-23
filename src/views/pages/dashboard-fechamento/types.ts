export type StatusValue = 'ALL' | 'APPROVED' | 'ERROR' | 'PENDING'

export type ColorType = 'primary' | 'error' | 'success' | 'secondary' | 'info' | 'warning' | undefined

export type SelectOptionsProps = {
  value: string
  label: string
}

export type bankProps = {
  id: string
  avatar: string | undefined
  name: string
  status: string
  extract: string
  conciliation: string
  validation: string
  userId: string
}

export type DataProps = {
  id: string
  avatar: string | undefined
  name: string
  status: string
  banks: bankProps[]
}
