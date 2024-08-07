export type StatusValue = 'ALL' | 'APPROVED' | 'ERROR' | 'PENDING'

export type ColorType = 'primary' | 'error' | 'success' | 'secondary' | 'info' | 'warning' | undefined

export type SelectOptionsProps = {
  value: string
  label: string
}

export type bankProps = {
  avatar: string | undefined
  name: string
  status: string
  extract: string
  conciliation: string
  validation: string
}

export type DataProps = {
  avatar: string | undefined
  name: string
  status: string
  banks: bankProps[]
}
