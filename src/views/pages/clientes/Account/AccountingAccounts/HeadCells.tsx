export interface HeadCellProps {
  disablePadding: boolean
  id: string
  label: string
}

const HeadCells: HeadCellProps[] = [
  {
    id: 'number',
    disablePadding: true,
    label: 'Conta Contábil'
  },
  {
    id: 'transactionType',
    disablePadding: false,
    label: 'Tipo'
  },
  {
    id: 'description',
    disablePadding: false,
    label: 'Descrição'
  },
  {
    id: 'createdAt',
    disablePadding: false,
    label: 'Data de Cadastro'
  },
  {
    id: 'actions',
    disablePadding: false,
    label: 'Ações'
  }
]

export default HeadCells
