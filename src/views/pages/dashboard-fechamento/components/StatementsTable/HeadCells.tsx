export interface HeadCellProps {
  disablePadding: boolean
  id: string
  label: string
}

const HeadCells: HeadCellProps[] = [
  {
    id: 'date',
    disablePadding: true,
    label: 'Data'
  },
  {
    id: 'amount',
    disablePadding: false,
    label: 'Valor'
  },
  {
    id: 'transactionTypeExtract',
    disablePadding: false,
    label: 'Tipo'
  },
  {
    id: 'extractDescription',
    disablePadding: false,
    label: 'Descrição'
  }
]

export default HeadCells
