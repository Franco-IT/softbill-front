export interface HeadCellProps {
  disablePadding: boolean
  id: string
  label: string
}

export const HeadCellsOFX: HeadCellProps[] = [
  {
    id: 'date',
    disablePadding: true,
    label: 'Data'
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
    id: 'origin',
    disablePadding: false,
    label: 'Origem'
  }
]
