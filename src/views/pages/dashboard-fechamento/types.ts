export type SubStatusProps = {
  status: boolean
  isError: boolean
  isPending: boolean
}

export type StatusProps = {
  extract: SubStatusProps
  conciliation: SubStatusProps
  validation: SubStatusProps
}

export type StatusMapProps = {
  PENDING: StatusProps
  PROCESSING: StatusProps
  TRANSACTION_UNTRACKED: StatusProps
  WAITING_VALIDATION: StatusProps
  DONE: StatusProps
}

export type StatusValue = 'DONE' | 'PENDING' | undefined

export interface StepProps {
  name: string
  icon: React.ReactNode
}

export type ColorType = 'primary' | 'error' | 'success' | 'secondary' | 'info' | 'warning' | undefined

export type SelectOptionsProps = {
  value: string
  label: string
}

export interface ClosureOptionsProps {
  id: string
  label: string
  logo: string
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
