export interface HeadCellProps {
  disablePadding: boolean
  id: string
  label: string
}

const HeadCells: HeadCellProps[] = [
  {
    id: 'Bank',
    disablePadding: true,
    label: 'Banco'
  },
  {
    id: 'cc',
    disablePadding: false,
    label: 'C. Crédito'
  },
  {
    id: 'cd',
    disablePadding: false,
    label: 'C. Débito'
  },
  {
    id: 'type',
    disablePadding: false,
    label: 'Tipo'
  },
  {
    id: 'value',
    disablePadding: false,
    label: 'Valor'
  },
  {
    id: 'description',
    disablePadding: false,
    label: 'Descrição'
  },
  {
    id: 'origin',
    disablePadding: false,
    label: 'Origem'
  }
]

export default HeadCells
