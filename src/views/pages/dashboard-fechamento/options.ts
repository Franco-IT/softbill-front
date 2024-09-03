import { SelectOptionsProps } from './types'

export const statusOptions: SelectOptionsProps[] = [
  {
    value: '',
    label: 'Todos'
  },
  {
    value: 'PENDING',
    label: 'Pendente'
  },
  {
    value: 'DONE',
    label: 'Aprovado'
  }
]

export const usersQuantiryOptions: SelectOptionsProps[] = [
  {
    value: '5',
    label: '5'
  },
  {
    value: '10',
    label: '10'
  },
  {
    value: '15',
    label: '15'
  },
  {
    value: '20',
    label: '20'
  },
  {
    value: '25',
    label: '25'
  },
  {
    value: '100',
    label: 'Todos'
  }
]

export const banksOptions: SelectOptionsProps[] = [
  {
    value: 'BANCO_DO_BRASIL',
    label: 'Banco do Brasil'
  },
  {
    value: 'BRADESCO',
    label: 'Bradesco'
  },
  {
    value: 'ITAU',
    label: 'Itaú'
  },
  {
    value: 'SANTANDER',
    label: 'Santander'
  },
  {
    value: 'CAIXA',
    label: 'Caixa Econômica Federal'
  }
]
