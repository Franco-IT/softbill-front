export interface HeadCellProps {
  disablePadding: boolean
  id: string
  label: string
}

const HeadCells: HeadCellProps[] = [
  {
    id: 'bankName',
    disablePadding: true,
    label: 'Banco'
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
    id: 'date',
    disablePadding: false,
    label: 'Data'
  },
  {
    id: 'extractDescription',
    disablePadding: false,
    label: 'Descrição'
  },
  {
    id: 'conciliationDescription',
    disablePadding: false,
    label: 'Nova Descrição'
  }
]

export default HeadCells
