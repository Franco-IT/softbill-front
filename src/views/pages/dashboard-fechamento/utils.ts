import { ColorType, DataProps } from './types'

export const statusColorsMUI: { [key: string]: ColorType } = {
  ALL: undefined,
  APPROVED: 'success',
  ERROR: 'error',
  PENDING: 'warning'
}

export const bankStatusLabel: { [key: string]: string } = {
  APPROVED: 'Aprovado',
  PENDING: 'Pendente',
  ERROR: 'Erro'
}

export const monthName: { [key: string]: string } = {
  january: 'Janeiro',
  february: 'Fevereiro',
  march: 'Março',
  april: 'Abril',
  may: 'Maio',
  june: 'Junho',
  july: 'Julho',
  august: 'Agosto',
  september: 'Setembro',
  octiber: 'Outubro',
  november: 'Novembro',
  dezember: 'Dezembro'
}

export const users: DataProps[] = [
  {
    avatar: undefined,
    name: 'Apple Inc.',
    status: 'APPROVED',
    banks: [
      {
        avatar: 'https://cdn.iconscout.com/icon/free/png-256/apple-1868761-1583153.png',
        name: 'Banco do Brasil',
        extract: 'APPROVED',
        conciliation: 'APPROVED',
        validation: 'APPROVED',
        status: 'APPROVED'
      },
      {
        avatar: 'https://cdn.iconscout.com/icon/free/png-256/apple-1868761-1583153.png',
        name: 'Bradesco',
        extract: 'APPROVED',
        conciliation: 'APPROVED',
        validation: 'APPROVED',
        status: 'APPROVED'
      },
      {
        avatar: 'https://cdn.iconscout.com/icon/free/png-256/apple-1868761-1583153.png',
        name: 'Itaú',
        extract: 'APPROVED',
        conciliation: 'APPROVED',
        validation: 'APPROVED',
        status: 'APPROVED'
      }
    ]
  },
  {
    avatar: undefined,
    name: 'Google Inc.',
    status: 'PENDING',
    banks: [
      {
        avatar: 'https://cdn.iconscout.com/icon/free/png-256/apple-1868761-1583153.png',
        name: 'Banco do Brasil',
        extract: 'APPROVED',
        conciliation: 'APPROVED',
        validation: 'APPROVED',
        status: 'APPROVED'
      },
      {
        avatar: 'https://cdn.iconscout.com/icon/free/png-256/apple-1868761-1583153.png',
        name: 'Bradesco',
        extract: 'APPROVED',
        conciliation: 'PENDING',
        validation: 'PENDING',
        status: 'PENDING'
      },
      {
        avatar: 'https://cdn.iconscout.com/icon/free/png-256/apple-1868761-1583153.png',
        name: 'Itaú',
        extract: 'APPROVED',
        conciliation: 'APPROVED',
        validation: 'PENDING',
        status: 'PENDING'
      }
    ]
  },
  {
    avatar: undefined,
    name: 'Facebook Inc.',
    status: 'ERROR',
    banks: [
      {
        avatar: 'https://cdn.iconscout.com/icon/free/png-256/apple-1868761-1583153.png',
        name: 'Banco do Brasil',
        extract: 'APPROVED',
        conciliation: 'APPROVED',
        validation: 'ERROR',
        status: 'ERROR'
      },
      {
        avatar: 'https://cdn.iconscout.com/icon/free/png-256/apple-1868761-1583153.png',
        name: 'Bradesco',
        extract: 'APPROVED',
        conciliation: 'PENDING',
        validation: 'PENDING',
        status: 'PENDING'
      },
      {
        avatar: 'https://cdn.iconscout.com/icon/free/png-256/apple-1868761-1583153.png',
        name: 'Itaú',
        extract: 'APPROVED',
        conciliation: 'APPROVED',
        validation: 'ERROR',
        status: 'ERROR'
      }
    ]
  },
  {
    avatar: undefined,
    name: 'Microsoft Inc.',
    status: 'ERROR',
    banks: [
      {
        avatar: 'https://cdn.iconscout.com/icon/free/png-256/apple-1868761-1583153.png',
        name: 'Banco do Brasil',
        extract: 'APPROVED',
        conciliation: 'APPROVED',
        validation: 'ERROR',
        status: 'ERROR'
      },
      {
        avatar: 'https://cdn.iconscout.com/icon/free/png-256/apple-1868761-1583153.png',
        name: 'Bradesco',
        extract: 'APPROVED',
        conciliation: 'PENDING',
        validation: 'PENDING',
        status: 'PENDING'
      },
      {
        avatar: 'https://cdn.iconscout.com/icon/free/png-256/apple-1868761-1583153.png',
        name: 'Itaú',
        extract: 'APPROVED',
        conciliation: 'APPROVED',
        validation: 'ERROR',
        status: 'ERROR'
      }
    ]
  },
  {
    avatar: undefined,
    name: 'Amazon Inc.',
    status: 'PENDING',
    banks: [
      {
        avatar: 'https://cdn.iconscout.com/icon/free/png-256/apple-1868761-1583153.png',
        name: 'Banco do Brasil',
        extract: 'APPROVED',
        conciliation: 'APPROVED',
        validation: 'APPROVED',
        status: 'APPROVED'
      },
      {
        avatar: 'https://cdn.iconscout.com/icon/free/png-256/apple-1868761-1583153.png',
        name: 'Bradesco',
        extract: 'APPROVED',
        conciliation: 'PENDING',
        validation: 'PENDING',
        status: 'PENDING'
      },
      {
        avatar: 'https://cdn.iconscout.com/icon/free/png-256/apple-1868761-1583153.png',
        name: 'Itaú',
        extract: 'APPROVED',
        conciliation: 'APPROVED',
        validation: 'APPROVED',
        status: 'APPROVED'
      }
    ]
  }
]

export const formatNameBank = (name: string) => {
  const nameArray = name.split(' ')

  return nameArray[0].length > 15 ? `${nameArray[0].slice(0, 15)}...` : name
}
