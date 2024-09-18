import { ColorType, StatusKeys, StatusMapProps } from './types'

// Mapeamento das cores de status para tipos MUI
export const statusColorsMUI: { [key: string]: ColorType } = {
  DONE: 'success',
  REJECTED: 'error',
  PENDING: 'warning'
}

// Rótulos dos status bancários
export const bankStatusLabel: { [key: string]: string } = {
  DONE: 'Aprovado',
  PENDING: 'Pendente'
}

// Mapeamento de tipos de integração
export const typesIntegration: { [key: string]: string } = {
  API: 'INTEGRAÇÃO',
  IMPORT: 'IMPORTAÇÃO'
}

// Rótulos dos status de fechamento
export const statusKeys: StatusKeys[] = ['PENDING', 'PROCESSING', 'TRANSACTION_UNTRACKED', 'WAITING_VALIDATION', 'DONE']

export const statusColors: { [key: string]: ColorType } = {
  PENDING: 'error',
  PROCESSING: 'warning',
  TRANSACTION_UNTRACKED: 'warning',
  WAITING_VALIDATION: 'warning',
  DONE: 'success'
}

// Rótulos dos status de fechamento
export const statusLabels: { [key: string]: string } = {
  PENDING: 'Pendente',
  PROCESSING: 'Processando',
  TRANSACTION_UNTRACKED: 'Transação não rastreada',
  WAITING_VALIDATION: 'Aguardando validação',
  DONE: 'Concluído'
}

// Mapeamento de status com suas respectivas propriedades
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
  PROCESSED: {
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

// Função para obter as iniciais de um nome
export const getInitials = (name: string): string => {
  const nameArray = name.split(' ')
  const initials = nameArray
    .slice(0, 3)
    .map(item => item[0])
    .join('')

  return initials.toUpperCase()
}

// Função para formatar o nome do banco com um limite de caracteres
export const formatNameBank = (name: string): string => {
  const nameArray = name.split(' ')

  return nameArray[0].length > 15 ? `${nameArray[0].slice(0, 15)}...` : name
}
