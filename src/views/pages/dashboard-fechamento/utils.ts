import { ColorType, StatusMapProps } from './types'

export const statusColorsMUI: { [key: string]: ColorType } = {
  DONE: 'success',
  REJECTED: 'error',
  PENDING: 'warning'
}

export const bankStatusLabel: { [key: string]: string } = {
  DONE: 'Aprovado',
  PENDING: 'Pendente'
}

export const statusMap: StatusMapProps = {
  PENDING: {
    extract: { status: false, isError: true, isPending: false },
    conciliation: { status: false, isError: true, isPending: false },
    validation: { status: false, isError: true, isPending: false }
  },
  PROCESSING: {
    extract: { status: true, isError: false, isPending: false },
    conciliation: { status: false, isError: false, isPending: true },
    validation: { status: false, isError: true, isPending: false }
  },
  TRANSACTION_UNTRACKED: {
    extract: { status: true, isError: false, isPending: false },
    conciliation: { status: false, isError: false, isPending: true },
    validation: { status: false, isError: true, isPending: false }
  },
  WAITING_VALIDATION: {
    extract: { status: true, isError: false, isPending: false },
    conciliation: { status: true, isError: false, isPending: false },
    validation: { status: false, isError: false, isPending: true }
  },
  DONE: {
    extract: { status: true, isError: false, isPending: false },
    conciliation: { status: true, isError: false, isPending: false },
    validation: { status: true, isError: false, isPending: false }
  }
}

export const formatNameBank = (name: string) => {
  const nameArray = name.split(' ')

  return nameArray[0].length > 15 ? `${nameArray[0].slice(0, 15)}...` : name
}
