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
    id: 'transactionTypeExtract',
    disablePadding: false,
    label: 'Tipo'
  },
  {
    id: 'amount',
    disablePadding: false,
    label: 'Valor'
  },
  {
    id: 'extractDescription',
    disablePadding: false,
    label: 'Descrição'
  }
]

export default HeadCells
